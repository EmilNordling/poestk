import Controller from './controller';
import Emitter from './Emitter';

function rebindEvents() {
  Emitter.rebindNativeEvents();
}

function unbindEvents() {
  Emitter.unbindNativeEvents();
}

function changeClass(changeTo, destructive, newFrame) {
  Controller.changeClass(changeTo, destructive, newFrame);
}

function reset() {
  Controller.clearPassives();
}

function decodeTree(hashstring) {
  Controller.updatePassive(hashstring);
}

function redraw() {
  Controller.newFrameID();
}

function getCurrentTabData() {
  return Controller.currentTabData;
}

export {
  changeClass,
  reset,
  decodeTree,
  getCurrentTabData,
  redraw,
  rebindEvents,
  unbindEvents,
};
