import Graph from '../parser/Graph';
import Connection from '../parser/Connection';
import Camera from './Camera';
import Renderer from './Renderer';
import Scene, { MatrixPoint } from './Scene';
import Vector2 from './Vector2';
import { RENDER_TILE_SIZE, TILE_SIZE } from '../utils/constants';
import chunk from './chunk';

class View {
  private camera: Camera;
  private renderer: Renderer;
  private scene: Scene;

  public init() {
    this.renderer = new Renderer();
    document.body.appendChild(this.renderer.domElement);

    this.scene = new Scene();
    this.camera = new Camera();

    Object.values(Graph.nodes).forEach((node) => {
      const vector = new Vector2(node.x, node.y);

      this.scene.addNode(new MatrixPoint(vector, node, node.size));
    });

    this.renderer.setRenderFunction(() => this.draw());

    // this.renderer.frameProvider.requestTick();
    this._draw();
  }

  _draw() {
    requestAnimationFrame(() => {
      this.camera.position.y += 0.1;
      this.camera.position.x += 0.4;
      // this.camera.position.z -= 0.0001;
      this.renderer.frameProvider.requestTick();
      this._draw();
    });
  }

  public draw() {
    const context = this.renderer.canvas.getContext()!;

    this.renderer.canvas.clear();

    this.renderer.renderMatrix.getVisableTileCoordiantes(this.renderer.domElement, this.camera,
      (tile) => {
        context.drawImage(
          tile.canvas.canvas,
          (tile.x * RENDER_TILE_SIZE) + -this.camera.position.x,
          (tile.y * RENDER_TILE_SIZE) + -this.camera.position.y,
          RENDER_TILE_SIZE,
          RENDER_TILE_SIZE,
        );
      },
      (buffer) => {
        chunk(buffer, context, this.camera, this.scene);

        // buffer.forEach((tile) => {
        //   context.rect(
        //     (tile.x * RENDER_TILE_SIZE) + -this.camera.position.x,
        //     (tile.y * RENDER_TILE_SIZE) + -this.camera.position.y,
        //     RENDER_TILE_SIZE,
        //     RENDER_TILE_SIZE,
        //   );
        // });
      });
  }
}

export default new View();
