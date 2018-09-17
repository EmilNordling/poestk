import Camera from './Camera';
import Tile from './Tile';
import { TILE_SIZE } from '../utils/constants';
import Vector2 from './Vector2';

interface TileMap {
  [tileDepth: string]: { [coordinates: string]: Tile };
}

class RenderMatrix {
  private depth: number | null = null;
  private tileMap: TileMap = {};

  getPixelCoord() {
    return 123 * Math.pow(2, Math.floor(1));
  }

  public _getTiles(pos: Vector2, canvas: HTMLCanvasElement, camera: Camera, tileCallback: (buffer: Tile) => void) {
    const scale = Math.pow(2, Math.floor(camera.position.z));
    const x = pos.x / TILE_SIZE;
    const y = pos.y / TILE_SIZE;

    console.log(pos.x)
    let startCol = Math.floor(x);
    let startRow = Math.floor(y);

    if (startCol > scale) startCol = 0;
    if (startRow > scale) startRow = 0;

    let endCol = x + ((canvas.width / devicePixelRatio) / TILE_SIZE);
    let endRow = y + ((canvas.height / devicePixelRatio) / TILE_SIZE);

    if (endCol > scale) endCol = scale - 1;
    if (endRow > scale) endRow = scale - 1;

    const tileBuffer = [];

    let visableTiles = 0;
    let column = 0;
    let row = 0;

    for (column = startCol; column <= endCol; column++) {
      for (row = startRow; row <= endRow; row++) {
        visableTiles++;
        tileCallback.call(this, [column, row]);
      }
    }

    console.log(x, endCol)
  }

  public getTiles(tileSize: number, canvas: HTMLCanvasElement, camera: Camera, tileCallback: (buffer: Tile) => void, tileBufferCallback: (buffer: any[]) => void) {
    const cameraSizeX = camera.position.x / tileSize;
    const cameraSizeY = camera.position.y / tileSize;
    const startCol = Math.floor(cameraSizeX);
    const startRow = Math.floor(cameraSizeY);
    const endCol = (cameraSizeX) + ((canvas.width / devicePixelRatio) / tileSize);
    const endRow = (cameraSizeY) + ((canvas.height / devicePixelRatio) / tileSize);
    const normalizeCameraZ = camera.position.z * 10;
    const cameraDepth = Math.floor(normalizeCameraZ);

    const tileBuffer = [];

    if (this.depth === null) {
      this.depth = cameraDepth;

      this.tileMap[cameraDepth] = {};
    }

    if (this.depth !== cameraDepth) {
      delete this.tileMap[cameraDepth];

      this.depth = cameraDepth;

      // console.log(this.depth)

      this.tileMap[cameraDepth] = {};
    }

    let column = 0;
    let row = 0;
    let visableTiles = 0;

    for (column = startCol; column <= endCol; column++) {
      for (row = startRow; row <= endRow; row++) {
        visableTiles++;

        const coords = Tile.coords({
          x: column,
          y: row,
          z: cameraDepth,
        });

        if (!this.tileMap[cameraDepth][coords.key]) {
          this.tileMap[cameraDepth][coords.key] = new Tile(coords);

          tileBuffer.push(this.tileMap[cameraDepth][coords.key]);
        } else {
          tileCallback.call(this, this.tileMap[cameraDepth][coords.key]);
        }
      }
    }

    tileBufferCallback.call(this, tileBuffer);
  }

  public getVisableTileCoordiantes(canvas: HTMLCanvasElement, camera: Camera, tileCallback: (buffer: Tile) => void, tileBufferCallback: (buffer: any[]) => void) {
    const cameraSizeX = camera.position.x / TILE_SIZE;
    const cameraSizeY = camera.position.y / TILE_SIZE;
    const startCol = Math.floor(cameraSizeX);
    const startRow = Math.floor(cameraSizeY);
    const endCol = (cameraSizeX) + ((canvas.width / devicePixelRatio) / TILE_SIZE);
    const endRow = (cameraSizeY) + ((canvas.height / devicePixelRatio) / TILE_SIZE);
    const normalizeCameraZ = camera.position.z * 10;
    const cameraDepth = Math.floor(normalizeCameraZ);

    const tileBuffer: Tile[] = [];

    if (this.depth === null) {
      this.depth = cameraDepth;

      this.tileMap[cameraDepth] = {};
    }

    if (this.depth !== cameraDepth) {
      delete this.tileMap[cameraDepth];

      this.depth = cameraDepth;

      this.tileMap[cameraDepth] = {};
    }

    let column = 0;
    let row = 0;
    let visableTiles = 0;

    for (column = startCol; column <= endCol; column++) {
      for (row = startRow; row <= endRow; row++) {
        visableTiles++;

        const coords = Tile.coords({
          x: column,
          y: row,
          z: cameraDepth,
        });

        // console.log(coords)

        if (!this.tileMap[cameraDepth][coords.key]) {
          this.tileMap[cameraDepth][coords.key] = new Tile(coords);

          tileBuffer.push(this.tileMap[cameraDepth][coords.key]);
        } else {
          tileCallback.call(this, this.tileMap[cameraDepth][coords.key]);
        }
      }
    }

    tileBufferCallback.call(this, tileBuffer);
  }
}

export default RenderMatrix;
