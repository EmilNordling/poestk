import Controller from './controller';

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
};
