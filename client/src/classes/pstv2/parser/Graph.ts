import { NodeData, PassiveNodeData } from '../index';
import PassiveNode from './PassiveNode';
import minX from '../treeData/min_x.json';
import minY from '../treeData/min_y.json';
import { ORBIT_RADIUS, SKILLS_PER_ORBIT, NODE_SIZE, NOTABLE_SIZE, KEYSTONE_SIZE, STROKE_SIZE } from '../utils/constants';
import { getOrbitAngle } from '../utils/math';
import Group from './Group';
import Connection from './Connection';

class Graph {
  public nodes: { [id: string]: PassiveNode} = {};
  public groups: { [id: string]: Group} = {};
  public connections: Connection[] = [];

  public getNode(id: string) {
    return this.nodes[id];
  }

  public popularize(data: NodeData) {
    const { nodes, groups } = data;

    nodes.forEach((node) => this.addNode(node.id.toString(), node));

    // TODO: pre parse most of this
    Object.entries(groups).forEach((entry) => {
      const key = entry[0];
      const value = entry[1];

      value.x += -minX;
      value.y += -minY;

      const group = new Group(key, { x: value.x, y: value.y }, value.oo);

      for (let e in value.n) {
        const node = this.getNode(value.n[e]);
        if (node.isAscendancy) {
          group.isAscendancy = true;
          group.ascendancyName = node.ascendancyName;
        }

        group.addNode = node;
      }

      this.groups[group.id] = group;
    });

    // TODO: pre parse most of this
    Object.values(this.groups).forEach((group) => group.foreachNode((outNode) => {
      const baseNodePosition = this.nodePosition(outNode, group.id);

      outNode.x = baseNodePosition.x;
      outNode.y = baseNodePosition.y;

      if (outNode.dn === 'Dexterity') {
        outNode.color = '#4da73d';
      } else if (outNode.dn === 'Intelligence') {
        outNode.color = '#00b6ff';
      } else if (outNode.dn === 'Strength') {
        outNode.color = '#d85555';
      } else {
        outNode.color = '#20232a';
      }

      outNode.color = '#20232a';

      if (outNode.ks === true) {
        outNode.size = KEYSTONE_SIZE;
        outNode.color = '#c200ff';
      } else if (outNode.not) {
        outNode.size = NOTABLE_SIZE;
        outNode.color = '#fdc163';
      } else {
        outNode.size = NODE_SIZE;
      }

      if (typeof outNode.out !== 'undefined') {
        outNode.out.forEach((out) => {
          if (this.nodes[out].ascendancyName && !outNode.ascendancyName) return;

          this.nodes[out].connection[outNode.id] = outNode;
          outNode.connection[out] = this.nodes[out];

          const connection = new Connection(outNode, this.nodes[out]);

          this.connections.push(connection);
        });
      }
    }));

    delete this.groups;
  }

  private nodePosition(node: PassiveNode, groupID: string) {
    const orbitValue = node.o || 0;
    const orbitIndexValue = node.oidx || 0;
    const getOrbit = ORBIT_RADIUS[orbitValue];
    const getAngle = getOrbitAngle(
      orbitIndexValue,
      SKILLS_PER_ORBIT[orbitValue],
    );

    const getPosition = {
      x: groupID ? this.groups[groupID].x : this.groups[node.groupID].x,
      y: groupID ? this.groups[groupID].y : this.groups[node.groupID].y,
    };

    getPosition.x -= getOrbit * Math.sin(-getAngle);
    getPosition.y -= getOrbit * Math.cos(-getAngle);

    return {
      x: (getPosition.x / 85) + 15,
      y: (getPosition.y / 85) + 40,
      angle: getAngle,
    };
  }

  private addNode(id: string, passive: PassiveNodeData) {
    this.nodes[id] = new PassiveNode(passive);
  }

  private addEdge() {

  }
}

export default new Graph();
