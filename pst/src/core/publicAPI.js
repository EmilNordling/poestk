import Controller from './controller';
import Emitter from './Emitter';

function changeClass(changeTo) {
  Controller.changeClass(changeTo);
}

function reset() {
  return Controller.clearPassives();
}

function decodeTree(hashstring) {
  Controller.updatePassive(hashstring);
}

export {
  changeClass,
  reset,
  decodeTree,
};
