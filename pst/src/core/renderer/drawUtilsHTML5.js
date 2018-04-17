import Controller from '../controller';
import Camera from './Camera';
import skillSpritesData from '../../treeData/skillSpritesData.json';

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
    Camera.scale(node.x),
    Camera.scale(node.y),
  );
  context.lineTo(
    Camera.scale(outNode.x),
    Camera.scale(outNode.y),
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

  if (node.not === true) {
    constrains = skillSpritesData.notableActive[0].coords[node.ni];
  } else if (node.ks === true) {
    constrains = skillSpritesData.keystoneActive[0].coords[node.ni];
  } else {
    constrains = skillSpritesData.normalActive[0].coords[node.ni];
  }

  // context.drawImage(Controller.assets.skills, Camera.scale(node.x), Camera.scale(node.y));
  context.drawImage(
    Controller.assets.skills,
    constrains.x,
    constrains.y,
    constrains.w,
    constrains.h,
    Camera.scale(node.x - node.size),
    Camera.scale(node.y - node.size),
    Camera.scale((node.size * 2)),
    Camera.scale((node.size * 2)),
  );

  context.beginPath();
  context.arc(
    Camera.scale(node.x),
    Camera.scale(node.y),
    Camera.scale(node.size),
    0,
    2 * Math.PI,
  );

  context.fillStyle = node.color;
  context.strokeStyle = Controller.ClientStore.treeState[Controller.ClientStore.viewTab].allocated[node.id] !== undefined ? Controller.ClientStore.theme.allocated : Controller.ClientStore.theme.path;
  // context.fill();
  context.stroke();
}

export {
  drawConnection,
  drawNode,
};
