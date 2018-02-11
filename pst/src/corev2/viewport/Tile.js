import $ from 'domtastic';
import Canvas from '../renderers/Canvas';

let id = 0;

export default class Tile {
  constructor(coords) {
    id += 1;

    this.key = coords.key;
    this.x = coords.x;
    this.y = coords.y;
    this.z = coords.z;
    this.id = id;
    this.groups = [];
    this.nodes = [];
    this.context = undefined;
    this.state = false;
    this.canCollectData = false;
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

  cacheTile(tileSize, context, offsetX, offsetY) {
    this.canvas = new Canvas();

    const tileSizeDPI = tileSize * devicePixelRatio;

    this.canvas.updateSize(tileSize, tileSize);
    this.context = this.canvas.getContext();

    const imageData = context.getImageData((this.x * tileSizeDPI) + (offsetX * devicePixelRatio), (this.y * tileSizeDPI) + (offsetY * devicePixelRatio), tileSizeDPI, tileSizeDPI);
    this.context.putImageData(imageData, 0, 0);

    this.state = true;
    // document.body.append(this.canvas.getCanvas());
    // $(this.canvas.getCanvas()).css({
    //   transform: 'scale(0.1)',
    //   'transform-origin': 'top left',
    //   position: 'absolute',
    //   left: `${10 + (this.x * tileSize) * 0.1}px`,
    //   top: `${220 + (this.y * tileSize) * 0.1}px`,
    //   'z-index': 999,
    //   background: 'red',
    // });
  }
}
