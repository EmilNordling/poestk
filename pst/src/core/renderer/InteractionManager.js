import Camera from './Camera';
import Controller from '../controller';
import Logger from '../utils/Logger';
import Emitter from '../Emitter';
import { strokeSize } from '../utils/constants';

Logger.register('coords');
Logger.register('hover');

let clientX = 0;
let clientY = 0;

// TODO: separate desktop and mobile
class InteractionManager {
  constructor() {
    Emitter.on('touchMove', InteractionManager.move.bind(this));
    Emitter.on('touchStart', InteractionManager.touchStart.bind(this));
    Emitter.on('touchEnd', InteractionManager.touchEnd.bind(this));
  }

  static touchStart(event) {
    if (devicePixelRatio === 1) return;

    clientX = event.changedTouches[0].pageX;
    clientY = event.changedTouches[0].pageY;

    // TODO: make it into one function it's used below
    let chunkData;
    const relativeX = Camera.position.x + clientX;
    const relativeY = Camera.position.y + clientY;

    const dataX = Math.floor(relativeX / Camera.zoomLevel / Controller.TreeData.tileSize);
    const dataY = Math.floor(relativeY / Camera.zoomLevel / Controller.TreeData.tileSize);
    const coordString = `${dataX}/${dataY}`;

    if (coordString === Controller.ClientStore.activeCoords) {
      chunkData = Controller.ClientStore.activeCoordsData;
    } else {
      chunkData = Controller.TreeData.getTiles(dataX, dataY);
      Controller.ClientStore.activeCoords = coordString;
      Controller.ClientStore.activeCoordsData = chunkData;

      Logger.log('coords', coordString);
    }

    // TODO: change to while and break when match is found
    // TODO: add to array and check which one is closest
    chunkData.nodes.forEach((n) => {
      const node = Controller.NodeData.nodes[n];
      const gotNode = InteractionManager.pointIsInCircle(
        relativeX,
        relativeY,
        Camera.scale(node.x),
        Camera.scale(node.y),
        Camera.scale(node.size * devicePixelRatio),
      );

      if (gotNode) {
        Emitter.emit('allocate', node);
      }
    });
  }

  static touchEnd() {
    if (Controller.ClientStore.isHovering) {
      Emitter.emit('allocate', Controller.ClientStore.isHovering);
    }
  }

  static move(event) {
    if (Controller.ClientStore.isMoving === true) return;

    InteractionManager.hoveringNode(
      {
        x: event.clientX,
        y: event.clientY,
      },
    );
  }

  static pointIsInCircle(mouseX, mouseY, nodeX, nodeY, radius = 10) {
    const deltaX = mouseX - nodeX;
    const deltaY = mouseY - nodeY;
    const squared = (deltaX * deltaX) + (deltaY * deltaY);

    return squared <= radius * radius;
  }

  /**
   * @param {object<x, y>} vec2
   * @return {object} node from Controller.NodeData
   */
  static hoveringNode(position) {
    // TODO: replace with mobile device check
    if (devicePixelRatio > 1) return;
    // TODO: make it into one function it's used above
    let chunkData;
    const relativeX = Camera.position.x + position.x;
    const relativeY = Camera.position.y + position.y;

    if (Controller.ClientStore.isHovering) {
      const stillHovering = InteractionManager.pointIsInCircle(
        relativeX,
        relativeY,
        Camera.scale(Controller.ClientStore.isHovering.x),
        Camera.scale(Controller.ClientStore.isHovering.y),
        Camera.scale(Controller.ClientStore.isHovering.size + strokeSize),
      );

      if (!stillHovering) {
        Controller.ClientStore.isHovering = false;
        Emitter.emit('hoverOut', false);
        Logger.log('hover', Controller.ClientStore.isHovering);
      }

      return;
    }

    const dataX = Math.floor(relativeX / Camera.zoomLevel / Controller.TreeData.tileSize);
    const dataY = Math.floor(relativeY / Camera.zoomLevel / Controller.TreeData.tileSize);
    const coordString = `${dataX}/${dataY}`;

    if (coordString === Controller.ClientStore.activeCoords) {
      chunkData = Controller.ClientStore.activeCoordsData;
    } else {
      chunkData = Controller.TreeData.getTiles(dataX, dataY);

      Controller.ClientStore.activeCoords = coordString;
      Controller.ClientStore.activeCoordsData = chunkData;

      Logger.log('coords', coordString);
    }

    // TODO: change to while and break when match is found
    chunkData.nodes.forEach((n) => {
      const node = Controller.NodeData.nodes[n];
      const isHovering = InteractionManager.pointIsInCircle(
        relativeX,
        relativeY,
        Camera.scale(node.x),
        Camera.scale(node.y),
        Camera.scale(node.size + strokeSize),
      );

      if (isHovering) {
        Controller.ClientStore.isHovering = node;
        Emitter.emit('hoverOver', node);
        Logger.log('hover', Controller.ClientStore.isHovering.id);
      }
    });
  }
}

export default InteractionManager;
