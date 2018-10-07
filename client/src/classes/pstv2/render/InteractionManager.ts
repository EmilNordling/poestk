import Camera from './Camera';
import Emitter from '../Emitter';
import { STROKE_SIZE, TILE_SIZE } from '../utils/constants';
import Renderer from './Renderer';
import State from '../State';
import Scene from './Scene';
import Vector2 from './Vector2';

let clientX = 0;
let clientY = 0;

// TODO: separate desktop and mobile
class InteractionManager {
  constructor(
    private camera: Camera,
    private renderer: Renderer,
    private scene: Scene,
  ) {
    Emitter.on('touchMove', this.move.bind(this));
    Emitter.on('touchStart', this.touchStart.bind(this));
    Emitter.on('touchEnd', this.touchEnd.bind(this));
  }

  touchStart(event) {
    if (devicePixelRatio === 1) return;

    clientX = event.changedTouches[0].pageX;
    clientY = event.changedTouches[0].pageY;

    // TODO: make it into one function it's used below
    let chunkData;
    const scale = this.camera.getScale();
    const translateX = this.camera.position.x * scale;
    const translateY = this.camera.position.y * scale;

    const relativePosition = new Vector2(
      ((translateX + clientX) - ((this.renderer.canvas.clientWidth * devicePixelRatio / 2))) / scale,
      ((translateY + clientY) - ((this.renderer.canvas.clientHeight * devicePixelRatio / 2))) / scale,
    );

    chunkData = this.scene.getTile(relativePosition);

    const node = chunkData.nodes.find((node) => this.pointIsInCircle(
      relativePosition.x,
      relativePosition.y,
      node.position.x,
      node.position.y,
      (node.context.size + STROKE_SIZE),
    ));

    if (node) {
      Emitter.emit('allocate', node.context);
    }
  }

  touchEnd() {
    if (State.isHovering) {
      Emitter.emit('allocate', State.isHovering.context);
    }
  }

  move(event) {
    if (this.camera.isMoving === true) return;

    this.hoveringNode(
      {
        x: event.clientX,
        y: event.clientY,
      },
    );
  }

  pointIsInCircle(mouseX, mouseY, nodeX, nodeY, radius = 10) {
    const deltaX = mouseX - nodeX;
    const deltaY = mouseY - nodeY;
    const squared = (deltaX * deltaX) + (deltaY * deltaY);

    return squared <= radius * radius;
  }

  hoveringNode(position) {
    if (devicePixelRatio > 1) return;

    const scale = this.camera.getScale();
    let chunkData;

    const translateX = this.camera.position.x * scale;
    const translateY = this.camera.position.y * scale;

    const relativePosition = new Vector2(
      ((translateX + position.x) - ((this.renderer.canvas.clientWidth * devicePixelRatio / 2))) / scale,
      ((translateY + position.y) - ((this.renderer.canvas.clientHeight * devicePixelRatio / 2))) / scale,
    );

    if (State.isHovering) {
      const stillHovering = this.pointIsInCircle(
        relativePosition.x,
        relativePosition.y,
        State.isHovering.position.x,
        State.isHovering.position.y,
        (State.isHovering.context.size + STROKE_SIZE),
      );

      if (!stillHovering) {
        State.isHovering = null;
        Emitter.emit('hoverOut', position, false);
      }

      return;
    }

    // const coordString = `${zoomLevel}/${dataX}/${dataY}`;
    chunkData = this.scene.getTile(relativePosition);

    const node = chunkData.nodes.find((node) => this.pointIsInCircle(
      relativePosition.x,
      relativePosition.y,
      node.position.x,
      node.position.y,
      (node.context.size + STROKE_SIZE),
    ));

    if (node) {
      State.isHovering = node;
      Emitter.emit('hoverOver', position, node);
    }
  }
}

export default InteractionManager;
