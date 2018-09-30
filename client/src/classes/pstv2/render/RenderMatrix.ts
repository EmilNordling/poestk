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

  public getTiles(pos: Vector2, canvas: HTMLDivElement, camera: Camera, tileCallback: (buffer: { [tile: string]: Tile }) => void, tileBufferCallback: (buffer: any[]) => void, debug: (buffer: any) => void) {
    const width = canvas.clientWidth * devicePixelRatio;
    const height = canvas.clientHeight * devicePixelRatio;
    const zoomLevel = Math.floor(camera.position.z);
    const scale = Math.pow(2, Math.floor(camera.position.z));
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const x = (pos.x - halfWidth) / TILE_SIZE;
    const y = (pos.y - halfHeight) / TILE_SIZE;
    let startCol = Math.floor(x);
    let startRow = Math.floor(y);
    let endX = Math.floor(((pos.x - halfWidth) + width) / TILE_SIZE);
    let endY = Math.floor(((pos.y - halfHeight) + height) / TILE_SIZE);

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
