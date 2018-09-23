import { Node } from '../../calc/parseData';
import Camera from './Camera';
import Scene from './Scene';
import { image } from '../index';
import Connection from '../parser/Connection';
import { STROKE_SIZE } from '../utils/constants';

function drawConnection(connection: Connection, context: CanvasRenderingContext2D, camera: Camera, scale: number) {
  let cancelBuffer = false;
  const node = connection.points.a;
  const outNode = connection.points.b;

  // TODO: add getterss
  // if (Controller.ClientStore.treeState[Controller.ClientStore.viewTab].allocated[node.id] &&
  //     Controller.ClientStore.treeState[Controller.ClientStore.viewTab].allocated[outNode.id] &&
  //    (node.id === Controller.ClientStore.treeState[Controller.ClientStore.viewTab].allocated[node.id].id) &&
  //    (outNode.id === Controller.ClientStore.treeState[Controller.ClientStore.viewTab].allocated[outNode.id].id)) {
  //   context.stroke();
  //   context.strokeStyle = Controller.ClientStore.theme.allocated;
  //   context.beginPath();
  //   cancelBuffer = true;
  // }

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

  context.strokeStyle = '#545662';
  context.stroke();
}

export {
  drawConnection,
  drawNode,
};
