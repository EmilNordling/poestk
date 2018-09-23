import Vector3 from './Vector3';
import Emitter from '../Emitter';

class Camera {
  public position = new Vector3(89.62564705882353, 191.29376470588235, 5);
  pastData: any;
  isMoving = false;

  constructor() {
    Emitter.on('touchStart', this.onTouchStart.bind(this));
    Emitter.on('touchMove', this.onTouchMove.bind(this));
    Emitter.on('touchEnd', this.onTouchEnd.bind(this));

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
  }

  onTouchStart(event) {
    event.preventDefault();

    this.pastData.x = null;
    this.pastData.y = null;
    this.pastData.zoom = null;
    this.pastData.touch = true;
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

  move(touchPointX, touchPointY) {
    const scale = Math.pow(2, Math.floor(this.position.z));

    if (this.pastData.x && this.pastData.y) {
      const deltaX = touchPointX - this.pastData.x;
      const deltaY = touchPointY - this.pastData.y;

      this.position.x -= (deltaX / scale) * devicePixelRatio;
      this.position.y -= (deltaY / scale) * devicePixelRatio;
    }

    this.isMoving = true;

    this.pastData.x = touchPointX;
    this.pastData.y = touchPointY;

    Emitter.emit('draw');
  }

  touchEvent(event) {
    const pressure = event.targetTouches;

    if (pressure.length === 1) {
      const touchPointX = event.targetTouches[0].pageX;
      const touchPointY = event.targetTouches[0].pageY;

      this.move(touchPointX, touchPointY);
    } else if (pressure.length === 2) {

    }
  }

  mouseMove(event) {
    const touchPointX = event.x;
    const touchPointY = event.y;

    this.move(touchPointX, touchPointY);
  }

  onTouchEnd() {
    this.isMoving = false;
    this.pastData.touch = false;
  }
}

export default Camera;
