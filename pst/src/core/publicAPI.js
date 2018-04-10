import Controller from './controller';
import Emitter from './Emitter';

function changeClass(changeTo) {
  Controller.changeClass(changeTo);
}

function reset() {
  console.log('xdd');
  Controller.clearPassives();
}

export {
  changeClass,
  reset,
};
