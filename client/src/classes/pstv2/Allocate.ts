import Emitter from './Emitter';
import { generateHash } from './hashShim';
import PassiveNode from './parser/PassiveNode';
import State from './State';

export enum AllocationEmitState {
  allocate,
  deallocate,
}

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

  constructor() {
    Emitter.on('allocate', this.allocate.bind(this));
  }

  allocate(node: PassiveNode, force = true) {
    const tab = State.selectedTab;

    if (tab === null) return;

    const connections = Object.keys(node.connection);
    const isAllocated = connections.filter(connection => connection in State.tabs[tab].allocated);

    // TODO: make code more functional
    // TODO: add branch crawling:
    // BFS all short paths to targeted allocating node. Build path to it.
    // DFS/BFS to find bridges when unallocating node. Remove nodes in bridge.
    if (State.tabs[tab].allocated[node.id] !== node) {
      if (force || isAllocated.length > 0) {
        // this.pointsAllocated++;
        State.tabs[tab].allocated[node.id] = node;
        Emitter.emit('allocated', node, AllocationEmitState.allocate);
      } else {
        console.log('branch to this node / use highlighted branch');
      }
    } else if (isAllocated.length === 1 || force) {
      // this.pointsAllocated--;
      delete State.tabs[tab].allocated[node.id];
      Emitter.emit('deallocated', node, AllocationEmitState.deallocate);
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


      // let result = 0;
      // const rootNode = (node.id).toString(); // hehe JavaScript
      // const findRoot = getClassNode(State.tabs[tab].startClass);

      // isAllocated.forEach((con) => {
      //   const queue = [con];
      //   const visited = [rootNode, con];

      //   while (queue.length > 0) {
      //     const current = queue.shift();

      //     if (current == findRoot) { // eslint-disable-line eqeqeq
      //       result++;

      //       return;
      //     }

      //     const curCon = Object.keys(Controller.NodeData.nodes[current].connection).filter(connection => connection in Controller.ClientStore.treeState[Controller.ClientStore.viewTab].allocated);
      //     curCon.forEach((x) => {
      //       if (x != current && !visited.includes(x)) { // eslint-disable-line eqeqeq
      //         visited.push(x);
      //         queue.push(x);
      //       }
      //     });
      //   }
      // });

      // console.log(result);
      // console.log(isAllocated.length);

      // if (result === isAllocated.length) {
      //   this.pointsAllocated--;
      //   delete Controller.ClientStore.treeState[tab].allocated[node.id];
      //   Emitter.emit('deallocated', node, AllocationEmitState.deallocate);
      // }
    }
  }
}

export default Allocate;
