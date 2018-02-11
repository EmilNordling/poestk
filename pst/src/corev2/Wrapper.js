import $ from 'domtastic';
import TreeData from './TreeData';
import { orbitRadius, skillsPerOrbit } from './utils/constants';
import { getOrbitAngle } from './utils/math';
import FrameProvider from './renderers/FrameProvider';
import View from './viewport/View';
import NodeData from './NodeData';
import Emitter from './Emitter';
import ClientStore from './ClientStore';
import AllocationObservable from './AllocationObservable';

class Wrapper {
  // TODO: rewrite
  constructor() {
    this.loaded = false;
    this.FrameProvider = new FrameProvider();
    this.View = new View();

    $(window).on('resize', () => {
      this.View.Canvas.updateSize(ClientStore.parent.offsetWidth, ClientStore.parent.offsetHeight);
      Emitter.emit('draw');
    });

    Emitter.on('draw', () => this.FrameProvider.requestTick())

    this.FrameProvider.mountTabs(
      this.View,
    );

    this.FrameProvider.setPrimaryTab(this.FrameProvider.tabs[0]);
  }

  mountCanvas(parent) {
    ClientStore.parent = parent;
    this.View.Canvas.updateSize(ClientStore.parent.offsetWidth, ClientStore.parent.offsetHeight);
    ClientStore.parent.append(this.View.Canvas.getCanvas());
    this.FrameProvider.requestTick();
  }

  async popularizeTiles() {
    if (this.loaded) return;

    const nodePosition = (node, group) => {
      const orbitValue = node.o || 0;
      const orbitIndexValue = node.oidx || 0;
      const getOrbit = orbitRadius[orbitValue];
      const getAngle = getOrbitAngle(
        orbitIndexValue,
        skillsPerOrbit[orbitValue],
      );

      const getPosition = {
        x: group ? NodeData.groups[group].x : NodeData.groups[node.groupID].x,
        y: group ? NodeData.groups[group].y : NodeData.groups[node.groupID].y,
      };

      getPosition.x -= getOrbit * Math.sin(-getAngle);
      getPosition.y -= getOrbit * Math.cos(-getAngle);

      return {
        x: getPosition.x,
        y: getPosition.y,
        angle: getAngle,
      };
    };

    await Object.keys(NodeData.groups).forEach(group => NodeData.groups[group].foreachNode((OUTNODE) => {
      const outNode = OUTNODE;

      const baseNodePosition = nodePosition(outNode, group.id);

      outNode.x = baseNodePosition.x;
      outNode.y = baseNodePosition.y;

      const column = Math.floor(baseNodePosition.x / TreeData.tileSize);
      const row = Math.floor(baseNodePosition.y / TreeData.tileSize);

      if (column >= 0 && row >= 0 && column <= TreeData.maxTileX && row <= TreeData.maxTileY) {
        const matrixID = `${column}/${row}`;
        TreeData.matrix[matrixID].nodes.push(outNode.id);

        // should it be here?
        // create connections
        if (outNode.out !== undefined) {
          outNode.out.forEach((out) => {
            NodeData.nodes[out].connection[outNode.id] = outNode;
            outNode.connection[out] = NodeData.nodes[out];
          });
        }
      }
    }));

    // TEMP: witch as start on tab 0
    ClientStore.treeState[ClientStore.viewTab].allocated[54447] = NodeData.nodes[54447];

    this.loaded = true;
    // this module is bad ¯\_(ツ)_/¯ one day it might not be
  }
}

export default new Wrapper();
