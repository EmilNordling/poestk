import Controller from './controller';
import Emitter from './Emitter';

function rebindEvents() {
  Emitter.rebindNativeEvents();
}

function unbindEvents() {
  Emitter.unbindNativeEvents();
}

function changeClass(changeTo: number, destructive: boolean, newFrame: boolean) {
  Controller.changeClass(changeTo, destructive, newFrame);
}

function reset() {
  Controller.clearPassives();
}

function decodeTree(hashstring: string) {
  Controller.updatePassive(hashstring);
}

function redraw() {
  Controller.newFrameID();
}

function getCurrentTabData() {
  return Controller.currentTabData;
}

function readMod(mod: string): number {

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
