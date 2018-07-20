import Controller from './controller';
import Emitter from './Emitter';
import { generateHash } from './hashShim';

// move to somewhere it make sense to have it
const getClassNode = (classID) => {
  switch (classID) {
    case 0:
      return 58833;
    case 1:
      return 47175;
    case 2:
      return 50459;
    case 3:
      return 54447;
    case 4:
      return 50986;
    case 5:
      return 61525;
    case 6:
      return 44683;
    default:
      throw new Error('invalid');
  }
};

class Allocate {
  characterLevel = 100;
  extraSkillPoints = 24;
  pointsAllocated = 0;
  pointsMax = this.characterLevel + this.extraSkillPoints;
  historyMaxBuffer = 512;
  historyFirstEdit = [];
  history = [];
  historyLastEdit = [];
  numAllocatedAscendancySkills = 0;
  numAllocatedSkills = 0;

  constructor() {
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
      // const rootNode = (node.id).toString();
      // const removeGroup = [rootNode];
      // const findRoot = getClassNode(Controller.currentTabData.startClass);

      // isAllocated.forEach((con) => {
      //   const allocatedCon = Object.keys(Controller.NodeData.nodes[con].connection).filter(connection => connection in Controller.ClientStore.treeState[Controller.ClientStore.viewTab].allocated);

      //   if (allocatedCon.length === 1) {
      //     removeGroup.concat(allocatedCon);

      //     return;
      //   }

      //   console.log(allocatedCon)
      // });


      let result = 0;
      const rootNode = (node.id).toString(); // hehe JavaScript
      const findRoot = getClassNode(Controller.currentTabData.startClass);

      isAllocated.forEach((con) => {
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

      console.log(result);
      console.log(isAllocated.length);

      if (result === isAllocated.length) {
        this.pointsAllocated--;
        delete Controller.ClientStore.treeState[tab].allocated[targetedNode.id];
        Emitter.emit('deallocated', targetedNode, true);
      }
    }

    const startClass = Controller.ClientStore.treeState[tab].startClass;
    const ascendancy = Controller.ClientStore.treeState[tab].ascendancy;
    const allocated = Object.values(Controller.ClientStore.treeState[tab].allocated).filter(x => x.id !== getClassNode(Controller.currentTabData.startClass));
    localStorage.setItem('link', generateHash(startClass, ascendancy, allocated));
  }
}

export default new Allocate();
