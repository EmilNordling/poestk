import controller from '../controller';
import minX from '../../treeData/min_x.json';
import minY from '../../treeData/min_y.json';
import { orbitRadius, skillsPerOrbit, nodeSize, notableSize, keystoneSize, strokeSize } from '../utils/constants';
import { getOrbitAngle } from '../utils/math';
import Passive from './Passive';
import Group from './Group';
import Connection from './Connection';

function nodePosition(node, group) {
  const orbitValue = node.o || 0;
  const orbitIndexValue = node.oidx || 0;
  const getOrbit = orbitRadius[orbitValue];
  const getAngle = getOrbitAngle(
    orbitIndexValue,
    skillsPerOrbit[orbitValue],
  );

  const getPosition = {
    x: group ? controller.NodeData.groups[group].x : controller.NodeData.groups[node.groupID].x,
    y: group ? controller.NodeData.groups[group].y : controller.NodeData.groups[node.groupID].y,
  };

  getPosition.x -= getOrbit * Math.sin(-getAngle);
  getPosition.y -= getOrbit * Math.cos(-getAngle);

  return {
    x: getPosition.x,
    y: getPosition.y,
    angle: getAngle,
  };
}

function graph(data) {
  data.nodes.map(node => controller.NodeData.addNode(node.id, new Passive(node)));

  Object.keys(data.groups).forEach((key) => {
    const entry = data.groups[key];

    entry.x += -minX;
    entry.y += -minY;

    const group = new Group(key, { x: entry.x, y: entry.y }, entry.oo);

    for (let e = 0, t = entry.n.length; e < t; e += 1) {
      const node = controller.NodeData.getNode(entry.n[e]);
      if (node.isAscendancy) {
        group.isAscendancy = true;
        group.ascendancyName = node.ascendancyName;
      }

      group.addNode = node;
    }

    controller.NodeData.groups[group.id] = group;
  });
}

function popularizeTiles() {
  Object.keys(controller.NodeData.groups).forEach(
    group => controller.NodeData.groups[group].foreachNode(
      (OUTNODE) => {
        const outNode = OUTNODE;

        const baseNodePosition = nodePosition(outNode, group.id);

        outNode.x = baseNodePosition.x;
        outNode.y = baseNodePosition.y;

        const column = Math.floor(baseNodePosition.x / controller.TreeData.tileSize);
        const row = Math.floor(baseNodePosition.y / controller.TreeData.tileSize);
        let matrixID;

        if (column >= 0 && row >= 0 && column <= controller.TreeData.maxTileX && row <= controller.TreeData.maxTileY) {
          matrixID = `${column}/${row}`;
          controller.TreeData.matrix[matrixID].nodes.push(outNode.id);

          if (outNode.dn === 'Dexterity') {
            outNode.color = '#4da73d';
          } else if (outNode.dn === 'Intelligence') {
            outNode.color = '#00b6ff';
          } else if (outNode.dn === 'Strength') {
            outNode.color = '#d85555';
          } else {
            outNode.color = '#20232a';
          }

          outNode.color = controller.ClientStore.theme.nodeDefault;

          if (outNode.ks === true) {
            outNode.size = keystoneSize;
            outNode.color = controller.ClientStore.theme.keyStoneDefault;
          } else if (outNode.not) {
            outNode.size = notableSize;
            outNode.color = controller.ClientStore.theme.notableDefault;
          } else {
            outNode.size = nodeSize;
          }

          const halfSize = (outNode.size / 2) + (strokeSize * 2);
          const topX = Math.floor((baseNodePosition.x + halfSize) / controller.TreeData.tileSize);
          const topY = Math.floor((baseNodePosition.y + halfSize) / controller.TreeData.tileSize);
          const bottomX = Math.floor((baseNodePosition.x - halfSize) / controller.TreeData.tileSize);
          const bottomY = Math.floor((baseNodePosition.y - halfSize) / controller.TreeData.tileSize);

          if (topX !== column) {
            controller.TreeData.matrix[`${topX}/${row}`].nodes.push(outNode.id);
          }

          if (bottomX !== column) {
            controller.TreeData.matrix[`${bottomX}/${row}`].nodes.push(outNode.id);
          }

          if (topY !== row) {
            controller.TreeData.matrix[`${column}/${topY}`].nodes.push(outNode.id);
          }

          if (bottomY !== row) {
            controller.TreeData.matrix[`${column}/${bottomY}`].nodes.push(outNode.id);
          }

          if (outNode.out !== undefined) {
            outNode.out.forEach((out) => {
              controller.NodeData.nodes[out].connection[outNode.id] = outNode;
              outNode.connection[out] = controller.NodeData.nodes[out];

              if (controller.NodeData.nodes[out].ascendancyName || outNode.ascendancyName) return;
              const newConnection = new Connection(outNode, controller.NodeData.nodes[out]);
              controller.TreeData.matrix[matrixID].connections.push(newConnection);

              const outNodeColumn = Math.floor(nodePosition(controller.NodeData.nodes[out], controller.NodeData.nodes[out].g).x / controller.TreeData.tileSize);
              const outNodeRow = Math.floor(nodePosition(controller.NodeData.nodes[out], controller.NodeData.nodes[out].g).y / controller.TreeData.tileSize);

              if (outNodeColumn !== column) {
                controller.TreeData.matrix[`${outNodeColumn}/${row}`].connections.push(newConnection);
              }

              if (outNodeRow !== row) {
                controller.TreeData.matrix[`${column}/${outNodeRow}`].connections.push(newConnection);
              }
            });
          }
        }
      },
    ),
  );
}

export {
  graph,
  popularizeTiles,
};
