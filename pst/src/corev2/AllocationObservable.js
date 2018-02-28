import ClientStore from './ClientStore';
import Emitter from './Emitter';
import { generateHash } from './hashShim';
import NodeData from './NodeData';

class Allocate {
  constructor() {
    this.characterLevel = 100;
    this.extraSkillPoints = 24;
    this.pointsAllocated = 0;
    this.pointsMax = this.characterLevel + this.extraSkillPoints;

    this.historyMaxBuffer = 512;
    this.historyFirstEdit = [];
    this.history = [];
    this.historyLastEdit = [];

    this.numAllocatedAscendancySkills = 0;
    this.numAllocatedSkills = 0;

    Emitter.on('allocate', this.allocate.bind(this));
  }

  /**
   * @param {object} Passive object
   */
  allocate(node, force = false) {
    const targetedNode = node;
    const connections = Object.keys(targetedNode.connection);
    const tab = ClientStore.viewTab;
    const isAllocated = connections.filter(connection => connection in ClientStore.treeState[tab].allocated);

    if (this.pointsAllocated === this.pointsMax) return;

    // TODO: make code more functional
    // TODO: add branch crawling:
    // BFS all short paths to targeted allocating node. Build path to it.
    // DFS/BFS to find bridges when unallocating node. Remove nodes in bridge.
    if (ClientStore.treeState[tab].allocated[targetedNode.id] !== targetedNode) {
      if (force || isAllocated.length > 0) {
        this.pointsAllocated++;
        ClientStore.treeState[tab].allocated[targetedNode.id] = targetedNode;
        Emitter.emit('redrawNode', targetedNode);
      } else {
        console.log('branch to this node / use highlighted branch');
      }
    } else if (isAllocated.length === 1 || force) {
      this.pointsAllocated--;
      delete ClientStore.treeState[tab].allocated[targetedNode.id];
      Emitter.emit('redrawNode', targetedNode, true);
    } else {
      let result = 0;
      const rootNode = (node.id).toString(); // hehe JavaScript

      isAllocated.forEach((con) => {
        const findRoot = 58833;
        const queue = [con];
        const visited = [rootNode, con];

        while (queue.length > 0) {
          const current = queue.shift();

          if (current == findRoot) { // eslint-disable-line eqeqeq
            result++;

            return;
          }

          const curCon = Object.keys(NodeData.nodes[current].connection).filter(connection => connection in ClientStore.treeState[ClientStore.viewTab].allocated);
          curCon.forEach((x) => {
            if (x != current && !visited.includes(x)) { // eslint-disable-line eqeqeq
              visited.push(x);
              queue.push(x);
            }
          });
        }
      });

      if (result === isAllocated.length) {
        this.pointsAllocated--;
        delete ClientStore.treeState[tab].allocated[targetedNode.id];
        Emitter.emit('redrawNode', targetedNode, true);
      }
    }

    const startClass = ClientStore.treeState[tab].startClass;
    const ascendancy = ClientStore.treeState[tab].ascendancy;
    const allocated = Object.values(ClientStore.treeState[tab].allocated);
    allocated.shift();
    generateHash(startClass, ascendancy, allocated);
  }
}

export default new Allocate();
