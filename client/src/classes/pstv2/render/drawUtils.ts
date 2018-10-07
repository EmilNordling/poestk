import { Node } from '../../calc/parseData';
import Camera from './Camera';
import Scene from './Scene';
import { image } from '../index';
import Connection from '../parser/Connection';
import { STROKE_SIZE } from '../utils/constants';
import State from '../State';

function drawConnection(connection: Connection, context: CanvasRenderingContext2D, camera: Camera, scale: number) {
  let cancelBuffer = false;
  const node = connection.points.a;
  const outNode = connection.points.b;

  const tab = State.tabs[State.selectedTab!];

  // TODO: add getterss
  if (tab.allocated[node.id] &&
      tab.allocated[outNode.id] &&
     (node.id === tab.allocated[node.id].id) &&
     (outNode.id === tab.allocated[outNode.id].id)) {
    context.stroke();
    context.strokeStyle = '#ff0000';
    context.beginPath();
    context.lineWidth = 0.1 * scale;

    cancelBuffer = true;
  }

  context.moveTo(
    (node.x * scale),
    (node.y * scale),
  );
  context.lineTo(
    (outNode.x * scale),
    (outNode.y * scale),
  );
  context.closePath();

  if (cancelBuffer) {
    context.stroke();

    context.strokeStyle = '#545662';
    context.beginPath();
  }
}

function drawNode(node: Node, context: CanvasRenderingContext2D, camera: Camera, scale: number) {
  if (node.m === true) return;

  const tab = State.tabs[State.selectedTab!];
  let imgNodeSize;

  if (node.not === true) {
    context.lineWidth = STROKE_SIZE * scale * 1.9;
    imgNodeSize = node.size * scale * 1.6;
  } else if (node.ks === true) {
    context.lineWidth = STROKE_SIZE * scale * 3;
    imgNodeSize = node.size * scale * 1.6;
  } else {
    context.lineWidth = STROKE_SIZE * scale;
    imgNodeSize = node.size * scale * 1.6;
  }

  const imgRelativePosition = imgNodeSize / 2;
  const imgPosition = imgNodeSize;

  context.beginPath();
  context.arc(
    node.x * scale,
    node.y * scale,
    node.size * scale,
    0,
    2 * Math.PI,
  );

  context.fillStyle = '#000000';
  context.fill();

  context.drawImage(
    image,
    node.s[0],
    node.s[1],
    node.s[2],
    node.s[3],
    (node.x * scale - imgRelativePosition),
    (node.y * scale - imgRelativePosition),
    imgPosition,
    imgPosition,
  );

  context.strokeStyle = tab.allocated[node.id] ? '#ff0000' : '#545662';
  context.stroke();
}

export {
  drawConnection,
  drawNode,
};
