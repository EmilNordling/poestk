import Camera from './Camera';
import Tile from './Tile';
import { TILE_SIZE, IS_DEBUG } from '../utils/constants';
import Vector2 from './Vector2';

interface TileMap {
  [tileDepth: string]: { [coordinates: string]: Tile };
}

class RenderMatrix {
  private depth: number | null = null;
  private tileMap: TileMap = {};

  public getTiles(start: Vector2, end: Vector2, camera: Camera, callback: (buffer: Tile[]) => void) {
    const zoomLevel = Math.floor(camera.position.z);
    const scale = Math.pow(2, Math.floor(camera.position.z));

    const startCol = Math.floor((start.x * scale) / TILE_SIZE);
    const startRow = Math.floor((start.y * scale) / TILE_SIZE);
    const endCol = Math.floor((end.x * scale) / TILE_SIZE);
    const endRow = Math.floor((end.y * scale) / TILE_SIZE);

    let column = 0;
    let row = 0;
    const tileBuffer = [];

    for (column = startCol; column <= endCol; column++) {
      for (row = startRow; row <= endRow; row++) {
        const coords = Tile.coords({
          z: zoomLevel,
          x: column,
          y: row,
        });

        if (this.tileMap[scale][coords.key]) {
          tileBuffer.push(this.tileMap[scale][coords.key]);
        }
      }
    }

    callback.call(this, tileBuffer);
  }

  public getVisables(position: Vector2, canvas: HTMLDivElement, camera: Camera, tileCallback: (buffer: { [tile: string]: Tile }) => void, tileBufferCallback: (buffer: any[]) => void, debug: (buffer: any) => void) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const zoomLevel = Math.floor(camera.position.z);
    const scale = Math.pow(2, Math.floor(camera.position.z));
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const x = (position.x - (halfWidth * devicePixelRatio)) / TILE_SIZE;
    const y = (position.y - (halfHeight * devicePixelRatio)) / TILE_SIZE;

    let startCol = Math.floor(x);
    let startRow = Math.floor(y);
    let endX = Math.floor(((position.x - (halfWidth * devicePixelRatio)) + width) / TILE_SIZE);
    let endY = Math.floor(((position.y - (halfHeight * devicePixelRatio)) + height) / TILE_SIZE);

    if (startCol <= 0) startCol = 0;
    if (startRow <= 0) startRow = 0;
    if (endX >= scale) endX = scale - 1;
    if (endY >= scale) endY = scale - 1;

    const tileBuffer = [];
    const cachedTiles: { [tile: string]: Tile } = {};

    if (this.depth === null) {
      this.depth = scale;

      this.tileMap[scale] = {};
    }

    if (this.depth !== scale) {
      delete this.tileMap[scale];

      this.depth = scale;

      this.tileMap[scale] = {};
    }

    let visableTiles = 0;
    let column = 0;
    let row = 0;

    for (column = startCol; column <= endX; column++) {
      for (row = startRow; row <= endY; row++) {
        visableTiles++;

        const coords = Tile.coords({
          z: zoomLevel,
          x: column,
          y: row,
        });

        if (!this.tileMap[scale][coords.key]) {
          this.tileMap[scale][coords.key] = new Tile(coords);

          tileBuffer.push(this.tileMap[scale][coords.key]);
        } else {
          cachedTiles[coords.key] = this.tileMap[scale][coords.key];
        }

        if (IS_DEBUG) debug.call(this, [column, row]);
      }
    }

    tileCallback.call(this, cachedTiles);
    tileBufferCallback.call(this, tileBuffer);
  }
}

export default RenderMatrix;
