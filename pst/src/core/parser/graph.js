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
    x: group ? controller.nodeData.groups[group].x : controller.nodeData.groups[node.groupID].x,
    y: group ? controller.nodeData.groups[group].y : controller.nodeData.groups[node.groupID].y,
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
  data.nodes.map(node => controller.nodeData.addNode(node.id, new Passive(node)));

  Object.keys(data.groups).forEach((key) => {
    const entry = data.groups[key];

    entry.x += -minX;
    entry.y += -minY;

    const group = new Group(key, { x: entry.x, y: entry.y }, entry.oo);

    for (let e = 0, t = entry.n.length; e < t; e += 1) {
      const node = controller.nodeData.getNode(entry.n[e]);
      if (node.isAscendancy) {
        group.isAscendancy = true;
        group.ascendancyName = node.ascendancyName;
      }

      group.addNode = node;
    }

    controller.nodeData.groups[group.id] = group;
  });
}

function popularizeTiles() {
  Object.keys(controller.nodeData.groups).forEach(
    group => controller.nodeData.groups[group].foreachNode(
      (OUTNODE) => {
        const outNode = OUTNODE;

        const baseNodePosition = nodePosition(outNode, group.id);

        outNode.x = baseNodePosition.x;
        outNode.y = baseNodePosition.y;

        const column = Math.floor(baseNodePosition.x / controller.treeData.tileSize);
        const row = Math.floor(baseNodePosition.y / controller.treeData.tileSize);
        let matrixID;

        if (column >= 0 && row >= 0 && column <= controller.treeData.maxTileX && row <= controller.treeData.maxTileY) {
          matrixID = `${column}/${row}`;
          controller.treeData.matrix[matrixID].nodes.push(outNode.id);

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
          const topX = Math.floor((baseNodePosition.x + halfSize) / controller.treeData.tileSize);
          const topY = Math.floor((baseNodePosition.y + halfSize) / controller.treeData.tileSize);
          const bottomX = Math.floor((baseNodePosition.x - halfSize) / controller.treeData.tileSize);
          const bottomY = Math.floor((baseNodePosition.y - halfSize) / controller.treeData.tileSize);

          if (topX !== column) {
            controller.treeData.matrix[`${topX}/${row}`].nodes.push(outNode.id);
          }

          if (bottomX !== column) {
            controller.treeData.matrix[`${bottomX}/${row}`].nodes.push(outNode.id);
          }

          if (topY !== row) {
            controller.treeData.matrix[`${column}/${topY}`].nodes.push(outNode.id);
          }

          if (bottomY !== row) {
            controller.treeData.matrix[`${column}/${bottomY}`].nodes.push(outNode.id);
          }

          if (outNode.out !== undefined) {
            outNode.out.forEach((out) => {
              controller.nodeData.nodes[out].connection[outNode.id] = outNode;
              outNode.connection[out] = controller.nodeData.nodes[out];

              if (controller.nodeData.nodes[out].ascendancyName || outNode.ascendancyName) return;
              const newConnection = new Connection(outNode, controller.nodeData.nodes[out]);
              controller.treeData.matrix[matrixID].connections.push(newConnection);

              const outNodeColumn = Math.floor(nodePosition(controller.nodeData.nodes[out], controller.nodeData.nodes[out].g).x / controller.treeData.tileSize);
              const outNodeRow = Math.floor(nodePosition(controller.nodeData.nodes[out], controller.nodeData.nodes[out].g).y / controller.treeData.tileSize);

              if (outNodeColumn !== column) {
                controller.treeData.matrix[`${outNodeColumn}/${row}`].connections.push(newConnection);
              }

              if (outNodeRow !== row) {
                controller.treeData.matrix[`${column}/${outNodeRow}`].connections.push(newConnection);
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
