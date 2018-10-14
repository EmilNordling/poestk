import FrameProvider from './FrameProvider';
import RenderMatrix from './RenderMatrix';
import Canvas from './Canvas';
import State from '../State';

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
  public parent: HTMLElement;

  public get domElement() {
    // return this.canvas.getCanvas();
    return this.canvas;
  }

  constructor() {
    const viewport = document.createElement('div');
    const plane = document.createElement('div');
    // TODO: replace this ugly mess with some other logic
    viewport.style.position = 'absolute';
    viewport.style.overflow = 'hidden';
    viewport.style.top = '0';
    viewport.style.right = '0';
    viewport.style.bottom = '0';
    viewport.style.left = '0';

    plane.style.position = 'relative';

    this.plane = plane;
    this.canvas = viewport;
  }

  public setRenderFunction(draw: () => void) {
    this.frameProvider.currentTab = () => draw();
  }
}

export default Renderer;
