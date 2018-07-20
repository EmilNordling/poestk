import Matrix from './Matrix';
import Camera from './Camera';
import Canvas from './Canvas';
import ChunkHTML5 from './ChunkHTML5';
import InteractionManager from './InteractionManager';
import Emitter from '../Emitter';
import { strokeSize, tileSize } from '../utils/constants';

class View {
  InteractionManager = new InteractionManager();
  Canvas = new Canvas();
  context = this.Canvas.getContext();
  matrix = new Matrix();
  cache = [];

  constructor() {
    if (devicePixelRatio > 1) {
      Emitter.listen(this.Canvas.getCanvas(), ['touchmove'], 'touchMove');
      Emitter.listen(this.Canvas.getCanvas(), ['touchstart'], 'touchStart');
      Emitter.listen(this.Canvas.getCanvas(), ['touchend'], 'touchEnd');
    } else {
      Emitter.listen(this.Canvas.getCanvas(), ['mousemove'], 'touchMove');
      Emitter.listen(this.Canvas.getCanvas(), ['mousedown'], 'touchStart');
      Emitter.listen(this.Canvas.getCanvas(), ['mouseup'], 'touchEnd');
    }

    Emitter.listen(this.Canvas.getCanvas(), 'wheel', 'zoom');

    Emitter.on('allocated', this.allocate.bind(this));
    Emitter.on('deallocated', this.allocate.bind(this));
  }

  allocate(target) {
    let lowestX = target.x - target.size;
    let lowestY = target.y - target.size;
    let highestX = target.x + target.size;
    let highestY = target.y + target.size;

    Object.keys(target.connection).forEach((connection) => {
      const node = target.connection[connection];
      const nodeSize = node.size + (strokeSize * 2);

      if (node.x - nodeSize < lowestX) lowestX = node.x - nodeSize;
      if (node.y - nodeSize < lowestY) lowestY = node.y - nodeSize;
      if (node.x + nodeSize > highestX) highestX = node.x + nodeSize;
      if (node.y + nodeSize > highestY) highestY = node.y + nodeSize;
    });

    this.matrix.getTiles({ x: lowestX, y: lowestY }, { x: highestX, y: highestY }, (tileBuffer) => {
      tileBuffer.forEach((tile) => {
        const x = tile.x * tileSize;
        const y = tile.y * tileSize;
        const offsetX = x + -Camera.position.x;
        const offsetY = y + -Camera.position.y;

        this.Canvas.clear(offsetX, offsetY, tileSize, tileSize);
        tile.canvas.clear();
      });

      ChunkHTML5(tileBuffer, this.context);
    });
  }

  draw() {
    this.Canvas.clear();

    this.matrix.getVisableTileCoordiantes(this.context, (tile) => {
      this.context.drawImage(
        tile.canvas.canvas,
        (tile.x * tileSize) + -Camera.position.x,
        (tile.y * tileSize) + -Camera.position.y,
        tileSize,
        tileSize,
      );
    }, (tileBuffer) => {
      ChunkHTML5(tileBuffer, this.context);
    });
  }
}

export default View;

