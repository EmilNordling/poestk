import Canvas from '../renderers/Canvas';

class Layer {
  constructor() {
    this.canvas = new Canvas();

    this.context = this.canvas.getContext();
  }
}

export default Layer;
