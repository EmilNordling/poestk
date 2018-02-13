import $ from 'domtastic';
import Matrix from './Matrix';
import TreeData from '../TreeData';
import Camera from './Camera';
import NodeData from '../NodeData';
import { Canvas, ChunkHTML5 } from '../renderers';
import InteractionManager from './InteractionManager';
import Emitter from '../Emitter';
import ClientStore from '../ClientStore';
import { strokeSize } from '../utils/constants';

// TODO: make better draw logic, shit's not really knice
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

    Emitter.on('redrawNode', this.redrawTile.bind(this));
  }

  redrawTile(node) {
    this.matrix.getTile({ x: node.x, y: node.y }, (tile) => {
      const context = tile.context;
      const x = tile.x * ClientStore.tileSize;
      const y = tile.y * ClientStore.tileSize;
      const offsetX = x + -Camera.position.x;
      const offsetY = y + -Camera.position.y;

      context.translate(-x, -y);

      context.strokeStyle = '#4455ad';
      context.lineWidth = Camera.scale(strokeSize);

      View.drawNode(node.id, context);

      tile.cacheTile(ClientStore.tileSize, context, -x, -y);
      this.Canvas.clear(offsetX, offsetY, ClientStore.tileSize, ClientStore.tileSize);
      this.context.drawImage(
        tile.canvas.canvas,
        (tile.x * ClientStore.tileSize) + -Camera.position.x,
        (tile.y * ClientStore.tileSize) + -Camera.position.y,
        ClientStore.tileSize,
        ClientStore.tileSize,
      );
    });
  }

  draw() {
    this.Canvas.clear();

    this.matrix.getVisableTileCoordiantes(this.context, (tile) => {
      this.context.fillStyle = `hsl(${(10 * (tile.x + tile.y))}, 50%, 50%)`;
      this.context.drawImage(
        tile.canvas.canvas,
        (tile.x * ClientStore.tileSize) + -Camera.position.x,
        (tile.y * ClientStore.tileSize) + -Camera.position.y,
        ClientStore.tileSize,
        ClientStore.tileSize,
      );
    }, (tileBuffer) => {
      // rewrite into more functional code
      if (tileBuffer.length === 0) return;

      const firstValue = tileBuffer[0];
      const lastValue = tileBuffer[tileBuffer.length - 1];
      let groupWidth = ClientStore.tileSize;
      let groupHeight = ClientStore.tileSize;
      let groupX = 0;
      let groupY = 0;
      let background = 'red';
      const offsetX = -(firstValue.x * ClientStore.tileSize);
      const offsetY = -(firstValue.y * ClientStore.tileSize);
      if (firstValue.x < lastValue.x && firstValue.y === lastValue.y) {
        groupWidth = (tileBuffer.length) * ClientStore.tileSize;
        groupY = firstValue.y;
        groupX = firstValue.x;
        background = 'blue';
      } else if (firstValue.y < lastValue.y && firstValue.x === lastValue.x) {
        groupHeight = (tileBuffer.length) * ClientStore.tileSize;
        groupY = firstValue.y;
        groupX = firstValue.x;
        background = 'green';
      } else {
        groupHeight = ((lastValue.y - firstValue.y) + 1) * ClientStore.tileSize;
        groupWidth = ((lastValue.x - firstValue.x) + 1) * ClientStore.tileSize;
        groupY = firstValue.y;
        groupX = firstValue.x;
      }

      const chunkCanvas = new ChunkHTML5({
        width: groupWidth,
        height: groupHeight,
        x: groupX,
        y: groupY,
      });

      const chunkContext = chunkCanvas.context();

      // rewrite
      chunkContext.translate(offsetX, offsetY);
      const startX = Math.floor(
        ((firstValue.x * ClientStore.tileSize) / Camera.zoomLevel / TreeData.tileSize),
      );
      const startY = Math.floor(
        ((firstValue.y * ClientStore.tileSize) / Camera.zoomLevel / TreeData.tileSize),
      );
      const endX = Math.ceil(
        (((lastValue.x + 1) * ClientStore.tileSize) / Camera.zoomLevel / TreeData.tileSize),
      );
      const endY = Math.ceil(
        (((lastValue.y + 1) * ClientStore.tileSize) / Camera.zoomLevel / TreeData.tileSize),
      );
      const chunkData = TreeData.getTiles(startX, startY, endX, endY);

      // tileBuffer.map((tile) => {
      //   chunkContext.fillStyle = `hsl(${(10 * (tile.x + tile.y))}, 50%, 50%)`;
      //   chunkContext.fillRect(
      //     tile.x * ClientStore.tileSize,
      //     tile.y * ClientStore.tileSize,
      //     ClientStore.tileSize,
      //     ClientStore.tileSize,
      //   );
      // });

      chunkContext.strokeStyle = '#A38D6D';
      chunkContext.lineWidth = Camera.scale(strokeSize);

      chunkData.nodes.forEach((n) => {
        View.drawNode(n, chunkContext);
      });

      chunkContext.setTransform(1, 0, 0, 1, 0, 0);

      tileBuffer.forEach((tile) => {
        tile.cacheTile(ClientStore.tileSize, chunkContext, offsetX, offsetY);
        this.context.drawImage(
          tile.canvas.canvas,
          (tile.x * ClientStore.tileSize) + -Camera.position.x,
          (tile.y * ClientStore.tileSize) + -Camera.position.y,
          ClientStore.tileSize,
          ClientStore.tileSize,
        );
      });

      // document.body.append(chunkCanvas.bufferCanvas.getCanvas());
      // $(chunkCanvas.bufferCanvas.getCanvas()).css({
      //   transform: 'scale(0.1)',
      //   'transform-origin': 'top left',
      //   position: 'absolute',
      //   left: `${10 + (groupX * ClientStore.tileSize) * 0.1}px`,
      //   top: `${10 + (groupY * ClientStore.tileSize) * 0.1}px`,
      //   'z-index': 999,
      //   background: background,
      // });

      // this.cache.push(bufferCanvas);
    });
  }

  // TODO: make so draw node doesn't need id
  static drawNode(n, context) {
    const node = NodeData.nodes[n];

    if (node.m === true || node.ascendancyName) return;

    context.beginPath();
    node.foreachConnection((outNodeID) => {
      const outNode = NodeData.nodes[outNodeID];
      if (outNode.ascendancyName) return;

      if (
        'startPositionClasses' in NodeData.nodes[outNodeID] &&
        NodeData.nodes[outNodeID].startPositionClasses.length > 0
      ) return;

      if (NodeData.nodes[outNodeID].isAscendancyStartNode) return;

      if (node.groupID !== outNode.groupID || node.orbit !== outNode.orbit) {
        context.moveTo(
          Camera.scale(node.x),
          Camera.scale(node.y),
        );
        context.lineTo(
          Camera.scale(outNode.x),
          Camera.scale(outNode.y),
        );
        context.closePath();
      } else {
        context.moveTo(
          Camera.scale(node.x),
          Camera.scale(node.y),
        );
        context.lineTo(
          Camera.scale(outNode.x),
          Camera.scale(outNode.y),
        );
        context.closePath();
      }
    });
    context.stroke();

    context.beginPath();
    context.arc(
      Camera.scale(node.x),
      Camera.scale(node.y),
      Camera.scale(node.size),
      0,
      2 * Math.PI,
    );

    context.fillStyle = node.color;
    context.fill();
    context.stroke();
  }
}

export default View;

