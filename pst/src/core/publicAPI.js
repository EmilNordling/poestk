import Controller from './controller';
import Emitter from './Emitter';

function changeClass(changeTo) {
  switch (changeTo) {
    case 'scion':
      Controller.ClientStore.treeState[Controller.ClientStore.viewTab].allocated[58833] = Controller.NodeData.nodes[58833];
      break;
    default:
      return false;
  }
}

export {
  changeClass,
};
