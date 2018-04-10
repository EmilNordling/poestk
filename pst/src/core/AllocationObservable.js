import Controller from './controller';
import Emitter from './Emitter';
import { generateHash } from './hashShim';

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
    const tab = Controller.ClientStore.viewTab;
    const isAllocated = connections.filter(connection => connection in Controller.ClientStore.treeState[tab].allocated);

    // TODO: make code more functional
    // TODO: add branch crawling:
    // BFS all short paths to targeted allocating node. Build path to it.
    // DFS/BFS to find bridges when unallocating node. Remove nodes in bridge.
    if (Controller.ClientStore.treeState[tab].allocated[targetedNode.id] !== targetedNode && this.pointsAllocated !== this.pointsMax) {
      if (force || isAllocated.length > 0) {
        this.pointsAllocated++;
        Controller.ClientStore.treeState[tab].allocated[targetedNode.id] = targetedNode;
        Emitter.emit('allocated', targetedNode);
      } else {
        console.log('branch to this node / use highlighted branch');
      }
    } else if (isAllocated.length === 1 || force) {
      this.pointsAllocated--;
      delete Controller.ClientStore.treeState[tab].allocated[targetedNode.id];
      Emitter.emit('deallocated', targetedNode, true);
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

          const curCon = Object.keys(Controller.NodeData.nodes[current].connection).filter(connection => connection in Controller.ClientStore.treeState[Controller.ClientStore.viewTab].allocated);
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
        delete Controller.ClientStore.treeState[tab].allocated[targetedNode.id];
        Emitter.emit('deallocated', targetedNode, true);
      }
    }

    const startClass = Controller.ClientStore.treeState[tab].startClass;
    const ascendancy = Controller.ClientStore.treeState[tab].ascendancy;
    const allocated = Object.values(Controller.ClientStore.treeState[tab].allocated);
    allocated.shift();
    localStorage.setItem('link', generateHash(startClass, ascendancy, allocated));
  }
}

export default new Allocate();
