import Camera from './Camera';
import Tile from './Tile';
import { RENDER_TILE_SIZE } from '../utils/constants';

interface TileMap {
  [tileDepth: string]: { [coordinates: string]: Tile };
}

class RenderMatrix {
  private depth: number | null = null;
  private tileMap: TileMap = {};

  public getVisableTileCoordiantes(canvas: HTMLCanvasElement, camera: Camera, tileCallback: (buffer: Tile) => void, tileBufferCallback: (buffer: any[]) => void) {
    const cameraSizeX = camera.position.x / RENDER_TILE_SIZE;
    const cameraSizeY = camera.position.y / RENDER_TILE_SIZE;
    const startCol = Math.floor(cameraSizeX);
    const startRow = Math.floor(cameraSizeY);
    const endCol = (cameraSizeX) + ((canvas.width / devicePixelRatio) / RENDER_TILE_SIZE);
    const endRow = (cameraSizeY) + ((canvas.height / devicePixelRatio) / RENDER_TILE_SIZE);
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

  // _getVisableTileCoordiantes(context, tileCallback, tileBufferCallback) {
  //   const cameraXsizeX = Camera.position.x / Controller.ClientStore.tileSize;
  //   const cameraXsizeY = Camera.position.y / Controller.ClientStore.tileSize;
  //   const startCol = Math.floor(cameraXsizeX);
  //   const startRow = Math.floor(cameraXsizeY);
  //   const endCol = (cameraXsizeX) + ((context.canvas.width / devicePixelRatio) / Controller.ClientStore.tileSize);
  //   const endRow = (cameraXsizeY) + ((context.canvas.height / devicePixelRatio) / Controller.ClientStore.tileSize);
  //   let column = 0;
  //   let row = 0;

  //   const tileBuffer = [];
  //   const bufferCanvas = {
  //     x: 0,
  //     y: 0,
  //   };

  //   let visableTiles = 0;

  //   for (column = startCol; column <= endCol; column++) {
  //     for (row = startRow; row <= endRow; row++) {
  //       // TODO: use bounds insted of block statment
  //       if (column >= 0 && row >= 0 && column <= this.maxTileX && row <= this.maxTileY) {
  //         visableTiles++;

  //         const coords = Tile.coords({
  //           x: column,
  //           y: row,
  //           z: this.zoomLevel,
  //         });

  //         if (!this.tiles[coords.key]) {
  //           this.tiles[coords.key] = new Tile(coords, Controller.frameID);

  //           tileBuffer.push(this.tiles[coords.key]);
  //         } else if (this.tiles[coords.key].localFrameID !== Controller.frameID) {
  //           this.tiles[coords.key].frameID = Controller.frameID;

  //           tileBuffer.push(this.tiles[coords.key]);
  //         } else {
  //           tileCallback.call(this, this.tiles[coords.key]);
  //         }
  //       }
  //     }
  //   }

  //   Logger.log('tiles', visableTiles);
  //   tileBufferCallback.call(this, tileBuffer, bufferCanvas);
  // }
}

export default RenderMatrix;
