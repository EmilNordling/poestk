import Controller from '../controller';
import Camera from './Camera';
import skillSpritesData from '../../treeData/skillSpritesData.json';
import { strokeSize } from '../utils/constants';

function drawConnection(connection, context) {
  let cancelBuffer = false;
  const node = connection.points.a;
  const outNode = connection.points.b;

  // TODO: add getterss
  if (Controller.ClientStore.treeState[Controller.ClientStore.viewTab].allocated[node.id] &&
      Controller.ClientStore.treeState[Controller.ClientStore.viewTab].allocated[outNode.id] &&
     (node.id === Controller.ClientStore.treeState[Controller.ClientStore.viewTab].allocated[node.id].id) &&
     (outNode.id === Controller.ClientStore.treeState[Controller.ClientStore.viewTab].allocated[outNode.id].id)) {
    context.stroke();
    context.strokeStyle = Controller.ClientStore.theme.allocated;
    context.beginPath();
    cancelBuffer = true;
  }

  context.moveTo(
    Math.floor(Camera.scale(node.x)),
    Math.floor(Camera.scale(node.y)),
  );
  context.lineTo(
    Math.floor(Camera.scale(outNode.x)),
    Math.floor(Camera.scale(outNode.y)),
  );
  context.closePath();

  if (cancelBuffer) {
    context.stroke();

    context.strokeStyle = Controller.ClientStore.theme.path;
    context.beginPath();
  }
}

// TODO: make so draw node doesn't need id
function drawNode(n, context) {
  const node = Controller.NodeData.nodes[n];

  if (node.m === true || node.ascendancyName) return;

  let constrains;
  let imgNodeSize;

  if (node.not === true) {
    constrains = skillSpritesData.notableActive[2].coords[node.ni];
    context.lineWidth = Camera.scale(strokeSize * 1.7);
    imgNodeSize = node.size * 1.65;
  } else if (node.ks === true) {
    constrains = skillSpritesData.keystoneActive[2].coords[node.ni];
    context.lineWidth = Camera.scale(strokeSize * 2.6);
    imgNodeSize = node.size * 1.7;
  } else {
    constrains = skillSpritesData.normalActive[2].coords[node.ni];
    context.lineWidth = Camera.scale(strokeSize);
    imgNodeSize = node.size * 1.65;
  }

  const imgRelativePosition = imgNodeSize / 2;
  const imgPosition = Camera.scale(imgNodeSize);

  context.beginPath();
  context.arc(
    Camera.scale(node.x),
    Camera.scale(node.y),
    Camera.scale(node.size),
    0,
    2 * Math.PI,
  );

  context.fillStyle = '#000000';
  context.fill();

  context.drawImage(
    Controller.assets.skills,
    constrains.x,
    constrains.y,
    constrains.w,
    constrains.h,
    Camera.scale(node.x - imgRelativePosition),
    Camera.scale(node.y - imgRelativePosition),
    imgPosition,
    imgPosition,
  );

  context.strokeStyle = Controller.ClientStore.treeState[Controller.ClientStore.viewTab].allocated[node.id] !== undefined ? Controller.ClientStore.theme.allocated : Controller.ClientStore.theme.path;
  context.stroke();
}

export {
  drawConnection,
  drawNode,
};
