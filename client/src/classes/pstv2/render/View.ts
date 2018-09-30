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
import Tile from './Tile';

class View {
  private camera: Camera;
  private renderer: Renderer;
  private scene: Scene;
  private interaction: InteractionManager;

  public init() {
    this.renderer = new Renderer();
    document.body.appendChild(this.renderer.domElement);

    if (devicePixelRatio > 1) {
      Emitter.listen(this.renderer.canvas, ['touchmove'], 'touchMove');
      Emitter.listen(this.renderer.canvas, ['touchstart'], 'touchStart');
      Emitter.listen(this.renderer.canvas, ['touchend'], 'touchEnd');
    } else {
      Emitter.listen(this.renderer.canvas, ['mousemove'], 'touchMove');
      Emitter.listen(this.renderer.canvas, ['mousedown'], 'touchStart');
      Emitter.listen(this.renderer.canvas, ['mouseup'], 'touchEnd');
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

  public draw() {
    const scale = Math.pow(2, Math.floor(this.camera.position.z));
    const translateX = this.camera.position.x * scale;
    const translateY = this.camera.position.y * scale;

    const context = this.renderer.plane;
    context.style.transform = `translate3d(${-translateX + (this.renderer.canvas.clientWidth * devicePixelRatio / 2)}px, ${-translateY + (this.renderer.canvas.clientHeight * devicePixelRatio / 2)}px, 0px)`;

    this.renderer.renderMatrix.getTiles(new Vector2(translateX, translateY), this.renderer.domElement, this.camera, (tiles) => {
      this.renderer.plane.childNodes.forEach((tile) => {
        const attribute = (tile as HTMLElement).getAttribute('pst-tile');

        if (attribute !== null && attribute in tiles === false) {
          tile.remove();
        }
      });

      Object.keys(tiles).forEach((tile) => {
        const DOMTile = tiles[tile].canvas.canvas;
        const attribute = (DOMTile as HTMLElement).getAttribute('pst-tile');

        if (attribute !== null && attribute in tiles && !this.renderer.plane.contains(DOMTile)) {
          this.renderer.plane.appendChild(DOMTile);
          DOMTile.style.transform = `translate3d(${tiles[attribute].x * TILE_SIZE}px, ${tiles[attribute].y * TILE_SIZE}px, 0px)`;
        }
      });
    }, (buffer) => {
      chunk(buffer, scale, this.renderer, this.camera, this.scene);
    }, (tile) => {
      const x = tile[0] * TILE_SIZE;
      const y = tile[1] * TILE_SIZE;
    });
  }
}

export default new View();
