import ClientStore from '../ClientStore';
import Camera from '../viewport/Camera';
import NodeData from '../NodeData';

function drawConnection(connection, context) {
  let cancelBuffer = false;
  const node = connection.points.a;
  const outNode = connection.points.b;

  // TODO: add getterss
  if (ClientStore.treeState[ClientStore.viewTab].allocated[node.id] &&
      ClientStore.treeState[ClientStore.viewTab].allocated[outNode.id] &&
     (node.id === ClientStore.treeState[ClientStore.viewTab].allocated[node.id].id) &&
     (outNode.id === ClientStore.treeState[ClientStore.viewTab].allocated[outNode.id].id)) {
    context.stroke();
    context.strokeStyle = ClientStore.theme.allocated;
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

    context.strokeStyle = ClientStore.theme.path;
    context.beginPath();
  }
}

// TODO: make so draw node doesn't need id
function drawNode(n, context) {
  const node = NodeData.nodes[n];

  if (node.m === true || node.ascendancyName) return;

  context.beginPath();
  context.arc(
    Camera.scale(node.x),
    Camera.scale(node.y),
    Camera.scale(node.size),
    0,
    2 * Math.PI,
  );

  context.fillStyle = node.color;
  context.strokeStyle = ClientStore.treeState[ClientStore.viewTab].allocated[node.id] !== undefined ? ClientStore.theme.allocated : ClientStore.theme.path;
  context.fill();
  context.stroke();
}

export {
  drawConnection,
  drawNode,
};
