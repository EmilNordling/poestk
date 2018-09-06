import Canvas from './Canvas';

let id = 0;

export default class Tile {
  key: any;
  x: any;
  y: any;
  z: any;
  id: any;
  localFrameID: any;
  canvas: any;
  groups = [];
  nodes = [];
  context = undefined;
  state = false;
  canCollectData = false;

  constructor(coords, frameID = null) {
    id += 1;

    this.key = coords.key;
    this.x = coords.x;
    this.y = coords.y;
    this.z = coords.z;
    this.id = id;
    this.localFrameID = frameID;
  }

  static coords(coord) {
    return {
      x: coord.x,
      y: coord.y,
      z: coord.z,
      key: Tile.coordsKey(coord),
    };
  }

  static coordsKey({ x, y, z }) {
    return `${x}/${y}/${z}`;
  }

  set frameID(newID) {
    this.localFrameID = newID;
  }

  cacheTile(tileSize, context, offsetX, offsetY) {
    this.canvas = new Canvas(tileSize, tileSize);

    const tileSizeDPI = tileSize * devicePixelRatio;

    this.canvas.updateSize(tileSize, tileSize);
    this.context = this.canvas.getContext();

    const imageData = context.getImageData((this.x * tileSizeDPI) + (offsetX * devicePixelRatio), (this.y * tileSizeDPI) + (offsetY * devicePixelRatio), tileSizeDPI, tileSizeDPI);
    this.context.putImageData(imageData, 0, 0);

    this.state = true;
  }
}
