import { PerspectiveCamera, WebGLRenderer, Geometry, Vector3, Color, Points, Scene, PointsMaterial, VertexColors, TextureLoader, Raycaster, Line, LineBasicMaterial, LineSegments, Texture } from 'three';
import { mouse as d3Mouse, zoom as d3Zoom, event as d3Event, select as d3Select, zoomIdentity as d3ZoomIdentity, ZoomBehavior, Selection } from 'd3';
import Graph from '../parser/Graph';
import Connection from '../parser/Connection';

const width = window.innerWidth;
const vizWidth = width;
const height = window.innerHeight;

const FOV = 50;
const ASPECT = width / height;
const NEAR = 50;
const FAR = 200;

const scale = window.devicePixelRatio || 1;
const size = 256;
const canvas = document.createElement('canvas');
canvas.width = size * scale;
canvas.height = size * scale;
canvas.style.width = `${size}px`;
canvas.style.height = `${size}px`;
const context = canvas.getContext('2d')!;
context.beginPath();
context.arc((size * scale) / 2, (size * scale) / 2, 100 * scale, 0, 2 * Math.PI, false);
context.fillStyle = '#ffffff';
context.fill();
context.lineWidth = 50 * scale;
context.strokeStyle = '#545662';
context.stroke();

class View {
  private d3Zoom: ZoomBehavior<Element, {}>;
  private d3View: Selection<HTMLCanvasElement, {}, null, undefined>;
  private camera = new PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
  private scene: Scene;
  private renderer: WebGLRenderer;
  private pointsGeometry: Geometry;
  private lineGeometries: Geometry[] = [];
  private points: Points;
  private rayCaster: Raycaster;

  public init() {
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
    this.renderer.setSize(width, height);
    document.body.appendChild(this.renderer.domElement);

    {
      this.d3Zoom = d3Zoom().scaleExtent([this.getScaleFromZ(FAR), this.getScaleFromZ(NEAR)]).on('zoom', () => {
        const d3Transform = d3Event.transform;

        this.handleZoom(d3Transform);
      });
      this.d3View = d3Select(this.renderer.domElement);
      this.d3View.call(this.d3Zoom).on('dblclick.zoom', null);

      const scale = this.getScaleFromZ(FAR);
      const transform = d3ZoomIdentity.translate(width / 2, height / 2).scale(scale);
      this.d3Zoom.transform(this.d3View, transform);

      this.camera.position.set(0, 0, FAR);
    }

    this.scene = new Scene();
    this.scene.background = new Color(0x1b1f2a);

    const texture = new Texture(canvas);
    texture.needsUpdate = true;

    {
      this.pointsGeometry = new Geometry();
      // const colors: Color[] = [];
      Object.values(Graph.nodes).forEach((node) => {
        const vertex = new Vector3(node.x, -node.y, 0);
        this.pointsGeometry.vertices.push(vertex);
        // const color = new Color('#545662');
        // colors.push(color);
      });
      // this.pointsGeometry.colors = colors;

      const pointMaterial = new PointsMaterial({
        size: 1.5,

        map: texture,
        transparent: true,
      });

      this.points = new Points(this.pointsGeometry, pointMaterial);

      this.scene.add(this.points);
    }

    Object.values(Graph.connections).forEach((connection) => this.addEdge(connection));

    // Object.values(Graph.nodes).forEach((node) => this.addNode(node));

    // this.rayCaster = new Raycaster();
    // this.rayCaster.params.Points!.threshold = 0.5;

    this.d3View.on('mousemove', () => {
      const [mouseX, mouseY] = d3Mouse(this.d3View.node()!);

      const position = [mouseX, mouseY];

      // this.checkIntersects(position);
    });

    this.animate();
  }

  private addNode(node: PassiveNode) {
    const pointMaterial = new PointsMaterial({
      size: 1.5,
      color: 0x0000ff,
      map: this.sprite,
      transparent: true,
    });

    const tempGeometry = new Geometry();
    tempGeometry.vertices.push(new Vector3(node.x, -node.y, 0));

    const point = new Points(tempGeometry, pointMaterial);
    this.pointGeometries.push(tempGeometry);

    this.scene.add(point);
  }

  private addEdge(connection: Connection) {
    const material = new LineBasicMaterial({
      linewidth: 1,
      color: 0x545662,
    });

    const tempGeometry = new Geometry();
    tempGeometry.vertices.push(new Vector3(connection.points.a.x, -connection.points.a.y, 0));
    tempGeometry.vertices.push(new Vector3(connection.points.b.x, -connection.points.b.y, 0));

    const line = new LineSegments(tempGeometry, material);
    line.scale.x = line.scale.y = 1;

    this.lineGeometries.push(tempGeometry);

    this.scene.add(line);
  }

  private mouseToThree(mouseX, mouseY) {
    return new Vector3(
      mouseX / vizWidth * 2 - 1,
      -(mouseY / height) * 2 + 1,
      1,
    );
  }

  private sortIntersectsByDistanceToRay(intersects: any[]) {
    return intersects.sort((obj1, obj2) => obj1.distanceToRay - obj2.distanceToRay);
  }

  private checkIntersects(position) {
    const mouseVector = this.mouseToThree(...position);

    this.rayCaster.setFromCamera(mouseVector, this.camera);

    const intersects = this.rayCaster.intersectObjects([this.points]);

    if (intersects[0]) {
      const sortedIntersect = this.sortIntersectsByDistanceToRay(intersects);
      const intersect = sortedIntersect[0];

      console.log(intersect)
    }
  }

  public handleZoom(d3Transform: { k: number, x: number, y: number }) {
    const scale = d3Transform.k;
    const x = -(d3Transform.x - width / 2) / scale;
    const y = (d3Transform.y - height / 2) / scale;
    const z = this.getZFromScale(scale);

    this.camera.position.set(x, y, z);
  }

  private setUpView() {
    this.d3View.on('');
  }

  private getZFromScale(scale: number) {
    const halfFov = FOV / 2;
    const halfFovRadians = this.toRadians(halfFov);
    const scaleHeight = height / scale;
    const cameraZposition = scaleHeight / (2 * Math.tan(halfFovRadians));

    return cameraZposition;
  }

  private getScaleFromZ(cameraZposition: number) {
    const halfFov = FOV / 2;
    const halfFovRadians = this.toRadians(halfFov);
    const halfFovHeight = Math.tan(halfFovRadians) * cameraZposition;
    const fovHeight = halfFovHeight * 2;
    const scale = height / fovHeight;

    return scale;
  }

  private toRadians(angle: number) {
    return angle * (Math.PI / 180);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }

  public mountCanvas() {

  }
}

export default new View();
