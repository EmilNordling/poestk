import Graph from '../parser/Graph';
import Connection from '../parser/Connection';
import Camera from './Camera';
import Renderer from './Renderer';
import Scene, { MatrixPoint, MatrixGeometry } from './Scene';
import Vector2 from './Vector2';
import { TILE_SIZE, DATA_TILE_SIZE, STROKE_SIZE } from '../utils/constants';
import chunk from './chunk';
import { drawConnection, drawNode } from './drawUtils';
import Emitter from '../Emitter';
import InteractionManager from './InteractionManager';
import Tile from './Tile';
import Allocate from '../Allocate';
import State from '../State';
import { v4 } from 'uuid';
import PassiveNode from '../parser/PassiveNode';

class View {
  private camera: Camera;
  private renderer: Renderer;
  private scene: Scene;
  private interaction: InteractionManager;
  private allocate: Allocate;

  public newTab() {
    const tabId = v4();

    State.tabs[tabId] = {
      startClass: 0,
      ascendancy: 0,
      allocated: {},
    };

    State.tabCount++;
    State.selectedTab = tabId;

    this.renderer.frameProvider.requestTick();
  }

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

    Emitter.on('allocated', this.allocateNode.bind(this));
    Emitter.on('deallocated', this.allocateNode.bind(this));

    this.scene = new Scene();
    this.camera = new Camera();
    this.interaction = new InteractionManager(this.camera, this.renderer, this.scene);
    this.allocate = new Allocate();

    Object.values(Graph.nodes).forEach((node) => {
      const vector = new Vector2(node.x, node.y);

      this.scene.addNode(new MatrixPoint(vector, node, node.size));
    });

    const test = {};

    Object.values(Graph.connections).forEach((connection) => {
      const start = new Vector2(connection.points.a.x, connection.points.a.y);
      const end = new Vector2(connection.points.b.x, connection.points.b.y);

      const id = `${connection.points.a.id}/${connection.points.b.id}`;
      const idR = `${connection.points.b.id}/${connection.points.a.id}`;

      if (id in test || id in test) {
        console.log('??')
      } else {
        test[id] = [];
      }

      this.scene.addConnection(new MatrixGeometry([start, end], connection));
    });

    this.renderer.setRenderFunction(() => this.draw());

    Emitter.on('draw', () => this.renderer.frameProvider.requestTick());

    this.newTab();
  }

  public allocateNode(target: PassiveNode) {
    const scale = Math.pow(2, Math.floor(this.camera.position.z));
    let lowestX = target.x - target.size;
    let lowestY = target.y - target.size;
    let highestX = target.x + target.size;
    let highestY = target.y + target.size;

    Object.keys(target.connection).forEach((connection) => {
      const node = target.connection[connection];
      console.log(node)
      const nodeSize = node.size + (STROKE_SIZE * 2);

      if (node.x - nodeSize < lowestX) lowestX = node.x - nodeSize;
      if (node.y - nodeSize < lowestY) lowestY = node.y - nodeSize;
      if (node.x + nodeSize > highestX) highestX = node.x + nodeSize;
      if (node.y + nodeSize > highestY) highestY = node.y + nodeSize;
    });

    const start = new Vector2(lowestX, lowestY);
    const end = new Vector2(highestX, highestY);

    this.renderer.renderMatrix.getTiles(start, end, this.camera, (tiles) => {
      tiles.forEach(tile => {
        const DOMTile = tile.canvas.canvas;

        DOMTile.remove();
      });

      chunk(tiles, scale, this.renderer, this.camera, this.scene);
    });
  }

  public draw() {
    const scale = Math.pow(2, Math.floor(this.camera.position.z));
    const translateX = this.camera.position.x * scale;
    const translateY = this.camera.position.y * scale;

    const context = this.renderer.plane;
    context.style.transform = `translate3d(${-translateX + (this.renderer.canvas.clientWidth * devicePixelRatio / 2)}px, ${-translateY + (this.renderer.canvas.clientHeight * devicePixelRatio / 2)}px, 0px)`;

    this.renderer.renderMatrix.getVisables(new Vector2(translateX, translateY), this.renderer.domElement, this.camera, (tiles) => {
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
