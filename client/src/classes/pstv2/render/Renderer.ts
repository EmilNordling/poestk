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
  // public canvas = new Canvas(window.innerWidth, window.innerHeight);
  public canvas: HTMLDivElement;
  public plane: HTMLDivElement;

  public get domElement() {
    // return this.canvas.getCanvas();
    return this.canvas;
  }

  constructor() {
    // this.canvas.updateSize(window.innerWidth, window.innerHeight);
    const viewport = document.createElement('div');
    const plane = document.createElement('div');
    // replace this ugly mess with some other logic
    viewport.style.position = 'absolute';
    viewport.style.overflow = 'hidden';
    viewport.style.top = '0';
    viewport.style.right = '0';
    viewport.style.bottom = '0';
    viewport.style.left = '0';
    document.body.appendChild(viewport);

    plane.style.position = 'relative';
    viewport.appendChild(plane);

    this.plane = plane;
    this.canvas = viewport;
  }

  public setRenderFunction(draw: () => void) {
    this.frameProvider.currentTab = () => draw();
  }

  public mountCanvas(parent: HTMLElement) {

  }
}

export default Renderer;
