import PassiveNode from '../parser/PassiveNode';
import Connection from '../parser/Connection';
import Vector2 from './Vector2';
import { STROKE_SIZE, TILE_SIZE } from '../utils/constants';

interface IMatrixPoint<T> {
  position: Vector2;
  context: T;
  size: number;
}

interface MatrixGroup {
  nodes: IMatrixPoint<PassiveNode>[];
  connections: IMatrixPoint<Connection>[];
}

interface Matrix {
  [id: string]: MatrixGroup;
}

const MAX_LENGTH = 19877;
const MAX_HEIGHT = 16120;
const MAX_TILE_Y = MAX_LENGTH / TILE_SIZE;
const MAX_TILE_X = MAX_HEIGHT / TILE_SIZE;

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

class Scene {
  public matrix: Matrix = {};

  constructor() {
    const gridY = Math.ceil(MAX_TILE_Y) + 1; // TODO: get rid of the + x
    const gridX = Math.ceil(MAX_TILE_X) + 2; // TODO: get rid of the + x

    for (let x = -1; x < gridX; x += 1) { // TODO: get rid of the - x
      for (let y = -1; y < gridY; y += 1) { // TODO: get rid of the - x
        const matrixID = `${x}/${y}`;

        this.matrix[matrixID] = {
          nodes: [],
          connections: [],
        };
      }
    }
  }

  public addNode(point: MatrixPoint<PassiveNode>) {
    const column = Math.floor(point.position.x / TILE_SIZE);
    const row = Math.floor(point.position.y / TILE_SIZE);
    const matrixID = `${column}/${row}`;
    this.matrix[matrixID].nodes.push(point);

    // overlaps
    const halfSize = (point.size / 2) + (STROKE_SIZE * 2);
    const topX = Math.floor((point.position.x + halfSize) / TILE_SIZE);
    const topY = Math.floor((point.position.y + halfSize) / TILE_SIZE);
    const bottomX = Math.floor((point.position.x - halfSize) / TILE_SIZE);
    const bottomY = Math.floor((point.position.y - halfSize) / TILE_SIZE);

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

  public getTiles(startX: number, startY: number, endX: number, endY: number) {
    let returnedData = {
      nodes: {},
      connections: [],
    };

    if (endX && endY) {
      for (let x = startX; x < endX; x += 1) {
        for (let y = startY; y < endY; y += 1) {
          if (`${x}/${y}` in this.matrix) {
            // returnedData.nodes.push(...this.matrix[`${x}/${y}`].nodes);
            this.matrix[`${x}/${y}`].nodes.forEach((node) => {
              if (returnedData.nodes[node.context.id]) return;

              returnedData.nodes[node.context.id] = node;
            });

            // returnedData.nodes[]
            returnedData.connections.push(...this.matrix[`${x}/${y}`].connections);
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
