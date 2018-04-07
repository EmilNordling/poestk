import Camera from './Camera';
import Logger from '../utils/Logger';
import Tile from './Tile';
import Controller from '../controller';
import minX from '../../treeData/min_x.json';
import minY from '../../treeData/min_y.json';
import maxX from '../../treeData/max_x.json';
import maxY from '../../treeData/max_y.json';

Logger.register('tiles', 'visable tiles');

export default class Matrix {
  // remake constructor
  constructor() {
    this.zoomLevel = 0;

    this.length = (maxX - minX) * Camera.zoomLevel;
    this.height = (maxY - minY) * Camera.zoomLevel;

    this.maxTileX = (this.length / Controller.ClientStore.tileSize);
    this.maxTileY = (this.height / Controller.ClientStore.tileSize);

    this.tiles = {};
  }

  // TODO: find more fitting param & var names. Also rewrite it
  getVisableTileCoordiantes(context, tileCallback, tileBufferCallback) {
    const cameraXsizeX = Camera.position.x / Controller.ClientStore.tileSize;
    const cameraXsizeY = Camera.position.y / Controller.ClientStore.tileSize;
    const startCol = Math.floor(cameraXsizeX);
    const startRow = Math.floor(cameraXsizeY);
    const endCol = (cameraXsizeX) + ((context.canvas.width / devicePixelRatio) / Controller.ClientStore.tileSize);
    const endRow = (cameraXsizeY) + ((context.canvas.height / devicePixelRatio) / Controller.ClientStore.tileSize);
    let column = 0;
    let row = 0;

    const tileBuffer = [];
    const bufferCanvas = {
      x: 0,
      y: 0,
    };

    let visableTiles = 0;

    for (column = startCol; column <= endCol; column++) {
      for (row = startRow; row <= endRow; row++) {
        // TODO: use bounds insted of block statment
        if (column >= 0 && row >= 0 && column <= this.maxTileX && row <= this.maxTileY) {
          visableTiles++;

          const coords = Tile.coords({
            x: column,
            y: row,
            z: this.zoomLevel,
          });

          if (!this.tiles[coords.key]) {
            this.tiles[coords.key] = new Tile(coords);

            tileBuffer.push(this.tiles[coords.key]);
          } else {
            tileCallback.call(this, this.tiles[coords.key]);
          }
        }
      }
    }

    Logger.log('tiles', visableTiles);
    tileBufferCallback.call(this, tileBuffer, bufferCanvas);
  }

  getTile(position, callback) {
    const tileX = Math.floor(Camera.scale(position.x) / Controller.ClientStore.tileSize);
    const tileY = Math.floor(Camera.scale(position.y) / Controller.ClientStore.tileSize);

    callback.call(this, this.tiles[`${tileX}/${tileY}/${this.zoomLevel}`]);
  }

  /**
   * @param {object<x, y>} start
   * @param {object<x, y>} end
   * @return {object} node from NodeData
   */
  getTiles(start, end, tileBufferCallback) {
    const startCol = Math.floor(Camera.scale(start.x) / Controller.ClientStore.tileSize);
    const startRow = Math.floor(Camera.scale(start.y) / Controller.ClientStore.tileSize);
    const endCol = Math.floor(Camera.scale(end.x) / Controller.ClientStore.tileSize);
    const endRow = Math.floor(Camera.scale(end.y) / Controller.ClientStore.tileSize);
    let column = 0;
    let row = 0;
    const tileBuffer = [];

    for (column = startCol; column <= endCol; column++) {
      for (row = startRow; row <= endRow; row++) {
        const coords = Tile.coords({
          x: column,
          y: row,
          z: this.zoomLevel,
        });

        if (this.tiles[coords.key]) {
          tileBuffer.push(this.tiles[coords.key]);
        }
      }
    }

    tileBufferCallback.call(this, tileBuffer);
  }
}
