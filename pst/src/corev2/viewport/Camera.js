import Logger from '../utils/Logger';
import ClientStore from '../ClientStore';
import Emitter from '../Emitter';
// TODO: add option to swap between these
import GlobalEmitter from '../../../../client/src/decorators/GlobalEmitter';

// should just be one like: Logger.register('camera', ['x', 'y'])
Logger.register('cameraX', 'x');
Logger.register('cameraY', 'y');
Logger.register('zoom');

class Camera {
  constructor(x, y, zoom) {
    this.position = {
      x: x || 0,
      y: y || 0,
    };
    this.offsetFromViewport = {
      x: 0,
      y: 0,
    };
    this.pastData = {
      x: null,
      y: null,
      zoom: null,
      touch: false,
    };

    this.zoomLevel = zoom || 1;
    this.isZoomed = false;
    this.zoomIndex = 0;

    // bind events, want to take these out of this class
    Emitter.on('touchStart', this.onTouchStart.bind(this));
    Emitter.on('touchMove', this.onTouchMove.bind(this));
    Emitter.on('touchEnd', this.onTouchEnd.bind(this));
    Emitter.on('zoom', this.wheelZoom.bind(this));

    Logger.log('zoom', this.zoomLevel);
  }

  // all below should stay
  setZoom() {

  }

  scale(value) {
    return Math.floor(value * this.zoomLevel);
  }

  setPan() {

  }

  center() {

  }

  // remake to setPan
  move(touchPointX, touchPointY) {
    if (this.pastData.x && this.pastData.y) {
      const deltaX = touchPointX - this.pastData.x;
      const deltaY = touchPointY - this.pastData.y;

      this.position.x -= deltaX;
      this.position.y -= deltaY;
    }

    ClientStore.isMoving = true;

    this.pastData.x = touchPointX;
    this.pastData.y = touchPointY;

    Logger.log('cameraX', this.position.x);
    Logger.log('cameraY', this.position.y);
    // request frame
    Emitter.emit('draw');
  }

  // remake to setZoom
  zoom(zoom, touchX, touchY) {
    const currentZoom = this.zoomLevel;
    const newZoom = this.zoomLevel + zoom;

    this.position.x += pX;
    this.position.y += pY;

    this.zoomLevel = newZoom;
    // request frame
    Emitter.emit('draw');
  }

  // all below should move out to an event class
  wheelZoom(event) {
    const direction = event.deltaY > 0 ? -0.05 : 0.05;

    this.setZoom(direction, event.x, event.y);
  }

  onTouchStart(event) {
    event.preventDefault();

    this.pastData.x = null;
    this.pastData.y = null;
    this.pastData.zoom = null;
    this.pastData.touch = true;
  }

  whereIsMouse() {

  }

  onTouchMove(event) {
    event.preventDefault();

    if (this.pastData.touch === false) return;

    if (event instanceof MouseEvent) {
      this.mouseMove(event);
    } else {
      this.touchEvent(event);
    }
  }

  mouseMove(event) {
    const touchPointX = event.x - this.offsetFromViewport.x;
    const touchPointY = event.y - this.offsetFromViewport.y;

    this.move(touchPointX, touchPointY);
  }

  pinchZoomValue(event) {
    let zoom = false;

    if (event.targetTouches.length >= 2) {
      const p1 = event.targetTouches[0];
      const p2 = event.targetTouches[1];
      const zoomScale = Math.sqrt(((p2.pageX - p1.pageX) ** 2) + ((p2.pageY - p1.pageY) ** 2));

      if (this.lastZoomScale) {
        zoom = zoomScale - this.lastZoomScale;
      }

      this.lastZoomScale = zoomScale;
    }

    return zoom / 100;
  }

  touchEvent(event) {
    const pressure = event.targetTouches;

    if (pressure.length === 1) {
      const touchPointX = event.targetTouches[0].pageX - this.offsetFromViewport.x;
      const touchPointY = event.targetTouches[0].pageY - this.offsetFromViewport.y;

      this.move(touchPointX, touchPointY);
    } else if (pressure.length === 2) {
      const deltaTouchPointX = ((event.targetTouches[0].pageX + event.targetTouches[1].pageX) / 2) - this.offsetFromViewport.x;
      const deltaTouchPointY = ((event.targetTouches[0].pageY + event.targetTouches[1].pageY) / 2) - this.offsetFromViewport.y;

      this.zoom(this.pinchZoomValue(event), deltaTouchPointX, deltaTouchPointY);
    }
  }

  onTouchEnd() {
    ClientStore.isMoving = false;
    this.pastData.touch = false;
  }
}

export default new Camera(900, 900, 0.2);
