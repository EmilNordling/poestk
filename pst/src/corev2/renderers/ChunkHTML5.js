import Canvas from './Canvas';

class BufferHTML5 {
  constructor({ width, height, x, y }) {
    this.bufferCanvas = new Canvas(width, height);
    this.bufferCanvas.updateSize(width, height);
    this.x = x;
    this.y = y;
  }

  context() {
    return this.bufferCanvas.getContext();
  }
}

export default BufferHTML5;
