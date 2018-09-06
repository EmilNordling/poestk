import FrameProvider from './FrameProvider';
import RenderMatrix from './RenderMatrix';
import Canvas from './Canvas';

function createCanvas(): HTMLCanvasElement {
  const scale = devicePixelRatio;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const canvas = document.createElement('canvas');

  canvas.width = width * scale;
  canvas.height = height * scale;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  return canvas;
}

class Renderer {
  public renderMatrix = new RenderMatrix();
  public frameProvider = new FrameProvider();
  public canvas = new Canvas(window.innerWidth, window.innerHeight);

  public get domElement() {
    return this.canvas.getCanvas();
  }

  constructor() {
    this.canvas.updateSize(window.innerWidth, window.innerHeight);
  }

  public setRenderFunction(draw: () => void) {
    this.frameProvider.currentTab = () => draw();
  }

  public mountCanvas(parent: HTMLElement) {

  }
}

export default Renderer;
