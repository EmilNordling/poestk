import Graph from '../parser/Graph';
import Connection from '../parser/Connection';
import Camera from './Camera';
import Renderer from './Renderer';
import Scene, { MatrixPoint, MatrixGeometry } from './Scene';
import Vector2 from './Vector2';
import { TILE_SIZE, DATA_TILE_SIZE } from '../utils/constants';
import chunk from './chunk';
import { drawConnection, drawNode } from './drawUtils';

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

    Object.values(Graph.connections).forEach((connection) => {
      const start = new Vector2(connection.points.a.x, connection.points.a.y);
      const end = new Vector2(connection.points.b.x, connection.points.b.y);

      this.scene.addConnection(new MatrixGeometry([start, end], connection));
    });

    this.renderer.setRenderFunction(() => this.draw());

    // this.renderer.frameProvider.requestTick();
    this._draw();
    // setInterval(() => {
    //   this._draw();
    // }, 1000);
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

      // this.camera.position.x += 0.01 * scale;
      // this.camera.position.y -= 0.01 * scale;
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
    const translateX = (-this.camera.position.x * scale) + (this.renderer.canvas.width / 2);
    const translateY = (-this.camera.position.y * scale) + (this.renderer.canvas.height / 2);

    context.setTransform(1, 0, 0, 1, 0, 0);
    this.renderer.canvas.clear();
    context.translate(translateX, translateY);

    const chunkData = this.scene.getData(new Vector2(0, 0), new Vector2(0 + TILE_SIZE, 0 + TILE_SIZE), scale);
    context.strokeStyle = '#545662';
    context.lineWidth = 0.1 * scale;
    context.beginPath();
    for (const connection in chunkData.connections) {
      drawConnection(chunkData.connections[connection].context, context, this.camera, scale);
    }
    context.stroke();

    for (const node in chunkData.nodes) {
      drawNode(chunkData.nodes[node].context, context, this.camera, scale);
    }

    this.renderer.renderMatrix._getTiles(new Vector2(translateX, translateY), this.renderer.domElement, this.camera, (tile: any) => {
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

    // const tileSize = 256 * (1 + (this.camera.position.z % 0.1 * 10));

    // this.renderer.renderMatrix.getTiles(tileSize, this.renderer.domElement, this.camera, (tile: any) => {
    //   context.drawImage(
    //     tile.canvas.canvas,
    //     (tile.x * tileSize) + -this.camera.position.x,
    //     (tile.y * tileSize) + -this.camera.position.y,
    //     tileSize,
    //     tileSize,
    //   );
    //   // tiles.forEach((coord) => {
    //   //   context.fillStyle = `hsl(${(10 * (coord.x + coord.y))}, 50%, 50%)`;
    //   //   context.fillRect(
    //   //     (coord.x * tileSize) + -this.camera.position.x,
    //   //     (coord.y * tileSize) + -this.camera.position.y,
    //   //     tileSize,
    //   //     tileSize,
    //   //   );
    //   // });
    // }, (buffer) => {
    //   console.log(buffer.length)
    //   chunk(tileSize, buffer, context, this.camera, this.scene);
    // });

    // this.renderer.renderMatrix.getVisableTileCoordiantes(this.renderer.domElement, this.camera,
    //   (tile) => {
    //     context.drawImage(
    //       tile.canvas.canvas,
    //       (tile.x * TILE_SIZE) + -this.camera.position.x,
    //       (tile.y * TILE_SIZE) + -this.camera.position.y,
    //       TILE_SIZE,
    //       TILE_SIZE,
    //     );
    //   },
    //   (buffer) => {
    //     chunk(buffer, context, this.camera, this.scene);

    //     // buffer.forEach((tile) => {
    //     //   context.rect(
    //     //     (tile.x * TILE_SIZE) + -this.camera.position.x,
    //     //     (tile.y * TILE_SIZE) + -this.camera.position.y,
    //     //     TILE_SIZE,
    //     //     TILE_SIZE,
    //     //   );
    //     // });
    //   });
  }
}

export default new View();
