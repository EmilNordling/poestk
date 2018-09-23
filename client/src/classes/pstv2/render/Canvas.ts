class Canvas {
  public canvas: HTMLCanvasElement;
  public width: any;
  public height: any;
  public scale: any;

  constructor(width: number, height: number, scale?: number) {
    this.canvas = document.createElement('canvas');
    this.width = width;
    this.height = height;
    this.scale = scale || window.devicePixelRatio || 1;
  }

  clear(x = 0, y = 0, width = this.width, height = this.height) {
    this.getContext()!.clearRect(x, y, width * this.scale, height * this.scale);
  }

  getContext() {
    return this.canvas.getContext('2d');
  }

  updateSize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.canvas.width = this.width * this.scale;
    this.canvas.height = this.height * this.scale;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.getContext()!.scale(this.scale, this.scale);
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
