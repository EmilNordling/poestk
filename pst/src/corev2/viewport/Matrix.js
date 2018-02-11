import Bounds from './Bounds';
import Camera from './Camera';
import Logger from '../utils/Logger';
import Tile from './Tile';
import ClientStore from '../ClientStore';

import minX from '../../treeData/min_x.json';
import minY from '../../treeData/min_y.json';
import maxX from '../../treeData/max_x.json';
import maxY from '../../treeData/max_y.json';

Logger.register('tiles', 'visable tiles');

export default class Matrix {
  // remake constructor
  constructor() {
    this.bounds = new Bounds({
      x: 0,
      y: 0,
    },
    {
      x: maxX - minX,
      y: maxY - minY,
    });

    this.zoomLevel = 0;

    this.length = (maxX - minX) * Camera.zoomLevel;
    this.height = (maxY - minY) * Camera.zoomLevel;

    this.maxTileX = (this.length / ClientStore.tileSize);
    this.maxTileY = (this.height / ClientStore.tileSize);

    this.tiles = {};
  }

  // TODO: find more fitting param & var names. Also rewrite it
  getVisableTileCoordiantes(context, tileCallback, tileBufferCallback) {
    const cameraXsizeX = Camera.position.x / ClientStore.tileSize;
    const cameraXsizeY = Camera.position.y / ClientStore.tileSize;
    const startCol = Math.floor(cameraXsizeX);
    const startRow = Math.floor(cameraXsizeY);
    const endCol = (cameraXsizeX) + ((context.canvas.width / devicePixelRatio) / ClientStore.tileSize);
    const endRow = (cameraXsizeY) + ((context.canvas.height / devicePixelRatio) / ClientStore.tileSize);
    let column = 0;
    let row = 0;

    const tileBuffer = [];
    const bufferCanvas = {
      x: 0,
      y: 0,
    };

    let visableTiles = 0;

    for (column = startCol; column <= endCol; column += (1 )) {
      for (row = startRow; row <= endRow; row += (1)) {
        // TODO: use bounds insted of block statment
        if (column >= 0 && row >= 0 && column <= this.maxTileX && row <= this.maxTileY) {
          visableTiles += 1;

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
    const tileX = Math.floor(Camera.scale(position.x) / ClientStore.tileSize);
    const tileY = Math.floor(Camera.scale(position.y) / ClientStore.tileSize);

    callback.call(this, this.tiles[`${tileX}/${tileY}/${this.zoomLevel}`]);
  }
}
