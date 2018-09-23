import Graph from '../parser/Graph';
import Connection from '../parser/Connection';
import Camera from './Camera';
import Renderer from './Renderer';
import Scene, { MatrixPoint, MatrixGeometry } from './Scene';
import Vector2 from './Vector2';
import { TILE_SIZE, DATA_TILE_SIZE } from '../utils/constants';
import chunk from './chunk';
import { drawConnection, drawNode } from './drawUtils';
import Emitter from '../Emitter';
import InteractionManager from './InteractionManager';

class View {
  private camera: Camera;
  private renderer: Renderer;
  private scene: Scene;
  private interaction: InteractionManager;

  public init() {
    this.renderer = new Renderer();
    document.body.appendChild(this.renderer.domElement);

    if (devicePixelRatio > 1) {
      Emitter.listen(this.renderer.canvas.getCanvas(), ['touchmove'], 'touchMove');
      Emitter.listen(this.renderer.canvas.getCanvas(), ['touchstart'], 'touchStart');
      Emitter.listen(this.renderer.canvas.getCanvas(), ['touchend'], 'touchEnd');
    } else {
      Emitter.listen(this.renderer.canvas.getCanvas(), ['mousemove'], 'touchMove');
      Emitter.listen(this.renderer.canvas.getCanvas(), ['mousedown'], 'touchStart');
      Emitter.listen(this.renderer.canvas.getCanvas(), ['mouseup'], 'touchEnd');
    }

    this.scene = new Scene();
    this.camera = new Camera();

    Object.values(Graph.nodes).forEach((node) => {
      const vector = new Vector2(node.x, node.y);

      this.scene.addNode(new MatrixPoint(vector, node, node.size));
    });

    Object.values(Graph.connections).forEach((connection) => {
      const start = new Vector2(connection.points.a.x, connection.points.a.y);
      const end = new Vector2(connection.points.b.x, connection.points.b.y);

      this.scene.addConnection(new MatrixGeometry([start, end], connection));
    });

    this.renderer.setRenderFunction(() => this.draw());

    Emitter.on('draw', () => this.renderer.frameProvider.requestTick());
    this.renderer.frameProvider.requestTick();
  }

  _draw() {

    // this.renderer.frameProvider.requestTick();
    requestAnimationFrame(() => {
      // this.camera.position.y -= 0.2;
      // if (this.camera.position.z <= 3 && this.camera.position.z >= 0) {
      // } else {
      //   this.camera.position.z = 0;
      // }
      const scale = Math.pow(2, Math.floor(this.camera.position.z));

      // this.camera.position.x += 0.1;
      // this.camera.position.y -= 0.1;
      // this.camera.position.z += 0.01;

      // this.camera.position.x = this.camera.position.x * this.camera.position.z;
      // this.camera.position.y = this.camera.position.y * this.camera.position.z;


      // if (this.camera.position.z >= 0) {
      //   console.log(this.camera.position.z)
      // }
      // if (this.camera.position.z <= 0) {
      //   return;
      // }
      this.renderer.frameProvider.requestTick();
      // this._draw();
    });
  }

  public draw() {
    const context = this.renderer.canvas.getContext()!;
    const scale = Math.pow(2, Math.floor(this.camera.position.z));
    const translateX = this.camera.position.x * scale;
    const translateY = this.camera.position.y * scale;

    context.setTransform(1, 0, 0, 1, 0, 0);
    this.renderer.canvas.clear();
    context.translate(-translateX + (this.renderer.canvas.width * devicePixelRatio / 2), - translateY + (this.renderer.canvas.height * devicePixelRatio / 2));

    this.renderer.renderMatrix.getTiles(new Vector2(translateX, translateY), this.renderer.domElement, this.camera, (tile: any) => {
      context.drawImage(
        tile.canvas.canvas,
        (tile.x * TILE_SIZE),
        (tile.y * TILE_SIZE),
        TILE_SIZE,
        TILE_SIZE,
      );
    }, (buffer) => {
      chunk(buffer, scale, this.renderer, this.camera, this.scene);
    }, (tile) => {
      const x = tile[0] * TILE_SIZE;
      const y = tile[1] * TILE_SIZE;

      context.font = '16px Verdana';
      context.strokeStyle = '#ff0000';
      context.fillStyle = '#ff0000';
      context.lineWidth = 1;
      context.fillText(`left: ${x} top: ${y}`, x + 10, y + 26);
      context.fillText(`x: ${tile[0]} y: ${tile[1]}`, x + 10, y + 46);
      context.strokeRect(x + 5, y + 5, TILE_SIZE - 5, TILE_SIZE - 5);
    });
  }
}

export default new View();
