import { Node } from '../../calc/parseData';
import { STROKE_SIZE } from '../../pstWebGL/utils/constants';
import Camera from './Camera';
import Scene from './Scene';
import { image } from '../index';

function drawNode(node: Node, context: CanvasRenderingContext2D, camera: Camera) {
  if (node.m === true) return;

  let imgNodeSize;

  if (node.not === true) {
    context.lineWidth = camera.scale(STROKE_SIZE * 1.9);
    imgNodeSize = node.size * 1.6;
  } else if (node.ks === true) {
    context.lineWidth = camera.scale(STROKE_SIZE * 3);
    imgNodeSize = node.size * 1.6;
  } else {
    context.lineWidth = camera.scale(STROKE_SIZE);
    imgNodeSize = node.size * 1.5;
  }

  const imgRelativePosition = imgNodeSize / 2;
  const imgPosition = camera.scale(imgNodeSize);

  context.beginPath();
  context.arc(
    camera.scale(node.x),
    camera.scale(node.y),
    camera.scale(node.size),
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
    camera.scale(node.x - imgRelativePosition),
    camera.scale(node.y - imgRelativePosition),
    imgPosition,
    imgPosition,
  );

  context.strokeStyle = '#545662';
  context.stroke();
}

export {
  drawNode,
};
