import Render from './Render';

class Canvas extends Render {
  constructor(width, height, scale) {
    super();

    this.canvas = document.createElement('canvas');
    this.width = width;
    this.height = height;
    this.scale = scale || window.devicePixelRatio || 1;
  }

  updateSize(width, height) {
    this.width = width;
    this.height = height;
    this.canvas.width = this.width * this.scale;
    this.canvas.height = this.height * this.scale;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.getContext().scale(this.scale, this.scale);
  }

  offset() {
    return {
      x: this.canvas.getBoundingClientRect().left,
      y: this.canvas.getBoundingClientRect().top,
    };
  }

  getCanvas() {
    return this.canvas;
  }
}

export default Canvas;
