import PassiveNode from '../parser/PassiveNode';
import Connection from '../parser/Connection';
import Vector2 from './Vector2';
import { STROKE_SIZE, DATA_TILE_SIZE } from '../utils/constants';

interface IMatrixPoint<T> {
  position: Vector2;
  context: T;
  size: number;
}

interface IMatrixGeometry<T> {
  positions: [Vector2, Vector2];
  context: T;
}

interface MatrixGroup {
  nodes: IMatrixPoint<PassiveNode>[];
  connections: IMatrixGeometry<Connection>[];
}

interface Matrix {
  [id: string]: MatrixGroup;
}

const MAX_LENGTH = 256;
const MAX_HEIGHT = 256;
const MAX_TILE_Y = MAX_LENGTH / DATA_TILE_SIZE;
const MAX_TILE_X = MAX_HEIGHT / DATA_TILE_SIZE;

export class MatrixPoint<T> implements IMatrixPoint<T> {
  public position: Vector2;
  public context: T;
  public size: number;

  constructor(position: Vector2, context: T, size: number) {
    this.position = position;
    this.context = context;
    this.size = size;
  }
}

export class MatrixGeometry<T> implements IMatrixGeometry<T> {
  public positions: [Vector2, Vector2];
  public context: T;

  constructor(positions: [Vector2, Vector2], context: T) {
    this.positions = positions;
    this.context = context;
  }
}

class Scene {
  public matrix: Matrix = {};

  constructor() {
    const gridY = Math.ceil(MAX_TILE_Y); // TODO: get rid of the + x
    const gridX = Math.ceil(MAX_TILE_X); // TODO: get rid of the + x

    for (let x = 0; x < gridX; x += 1) { // TODO: get rid of the - x
      for (let y = 0; y < gridY; y += 1) { // TODO: get rid of the - x
        const matrixID = `${x}/${y}`;

        this.matrix[matrixID] = {
          nodes: [],
          connections: [],
        };
      }
    }
  }

  public _getTiles(start: Vector2, end: Vector2): MatrixGroup[] {
    const startX = Math.floor(start.x / DATA_TILE_SIZE);
    const startY = Math.floor(start.y / DATA_TILE_SIZE);
    const endX = Math.ceil(end.x / DATA_TILE_SIZE);
    const endY = Math.ceil(end.y / DATA_TILE_SIZE);

    const tiles = [];

    for (let x = startX - 1; x < endX + 1; x += 1) {
      for (let y = startY - 1; y < endY + 1; y += 1) {
        const id = `${x}/${y}`;

        if (id in this.matrix) {
          tiles.push(this.matrix[id]);
        }
      }
    }

    return tiles;
  }

  public addConnection(geometry: MatrixGeometry<Connection>) {
    this._getTiles(geometry.positions[0], geometry.positions[1]).forEach(x => x.connections.push(geometry));
  }

  public addNode(point: MatrixPoint<PassiveNode>) {
    const column = Math.floor(point.position.x / DATA_TILE_SIZE);
    const row = Math.floor(point.position.y / DATA_TILE_SIZE);
    const matrixID = `${column}/${row}`;
    this.matrix[matrixID].nodes.push(point);

    // overlaps
    const halfSize = (point.size / 2) + (STROKE_SIZE * 2);
    const topX = Math.floor((point.position.x + halfSize) / DATA_TILE_SIZE);
    const topY = Math.floor((point.position.y + halfSize) / DATA_TILE_SIZE);
    const bottomX = Math.floor((point.position.x - halfSize) / DATA_TILE_SIZE);
    const bottomY = Math.floor((point.position.y - halfSize) / DATA_TILE_SIZE);

    if (topX !== column) {
      this.matrix[`${topX}/${row}`].nodes.push(point);
    }

    if (bottomX !== column) {
      this.matrix[`${bottomX}/${row}`].nodes.push(point);
    }

    if (topY !== row) {
      this.matrix[`${column}/${topY}`].nodes.push(point);
    }

    if (bottomY !== row) {
      this.matrix[`${column}/${bottomY}`].nodes.push(point);
    }
  }

  public getData(start: Vector2, end: Vector2, scale: number) {
    let returnedData = {
      nodes: {},
      connections: {},
    };

    const startX = start.x;
    const startY = start.y;
    const endX = end.x;
    const endY = end.y;

    for (let x = startX; x < endX; x++) {
      for (let y = startY; y < endY; y++) {
        if (`${x}/${y}` in this.matrix) {
          this.matrix[`${x}/${y}`].nodes.forEach((node) => {
            if (returnedData.nodes[node.context.id]) return;

            returnedData.nodes[node.context.id] = node;
          });

          this.matrix[`${x}/${y}`].connections.forEach((connection) => {
            if (returnedData.connections[connection.context.id]) return;

            returnedData.connections[connection.context.id] = connection;
          });
        }
      }
    }

    console.log(this)
    console.log(returnedData)

    return returnedData;
  }

  public getTiles(startX: number, startY: number, endX: number, endY: number) {
    let returnedData = {
      nodes: {},
      connections: {},
    };

    if (endX && endY) {
      for (let x = startX; x < endX; x += 1) {
        for (let y = startY; y < endY; y += 1) {
          if (`${x}/${y}` in this.matrix) {
            this.matrix[`${x}/${y}`].nodes.forEach((node) => {
              if (returnedData.nodes[node.context.id]) return;

              returnedData.nodes[node.context.id] = node;
            });

            this.matrix[`${x}/${y}`].connections.forEach((connection) => {
              if (returnedData.connections[connection.context.id]) return;

              returnedData.connections[connection.context.id] = connection;
            });
          }
        }
      }

      return returnedData;
    }

    returnedData = this.matrix[`${startX}/${startY}`] || returnedData;

    return returnedData;
  }
}

export default Scene;
