import Matrix from './Matrix';
import Camera from './Camera';
import { Canvas, draw } from '../renderers';
import InteractionManager from './InteractionManager';
import Emitter from '../Emitter';
import ClientStore from '../ClientStore';
import { strokeSize } from '../utils/constants';

class View {
  constructor() {
    this.InteractionManager = new InteractionManager();
    this.Canvas = new Canvas();
    this.context = this.Canvas.getContext();
    this.matrix = new Matrix();
    this.cache = [];

    // TODO: sepperate these
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
      const nodeSize = node.size + (strokeSize * 2)

      if (node.x - nodeSize < lowestX) lowestX = node.x - nodeSize;
      if (node.y - nodeSize < lowestY) lowestY = node.y - nodeSize;
      if (node.x + nodeSize > highestX) highestX = node.x + nodeSize;
      if (node.y + nodeSize > highestY) highestY = node.y + nodeSize;
    });

    this.matrix.getTiles({ x: lowestX, y: lowestY }, { x: highestX, y: highestY }, (tileBuffer) => {
      tileBuffer.forEach((tile) => {
        const x = tile.x * ClientStore.tileSize;
        const y = tile.y * ClientStore.tileSize;
        const offsetX = x + -Camera.position.x;
        const offsetY = y + -Camera.position.y;

        this.Canvas.clear(offsetX, offsetY, ClientStore.tileSize, ClientStore.tileSize);
        tile.canvas.clear();
      });

      draw(tileBuffer, this.context);
    });
  }

  draw() {
    this.Canvas.clear();

    this.matrix.getVisableTileCoordiantes(this.context, (tile) => {
      this.context.drawImage(
        tile.canvas.canvas,
        (tile.x * ClientStore.tileSize) + -Camera.position.x,
        (tile.y * ClientStore.tileSize) + -Camera.position.y,
        ClientStore.tileSize,
        ClientStore.tileSize,
      );
    }, (tileBuffer) => {
      draw(tileBuffer, this.context);
    });
  }
}

export default View;

