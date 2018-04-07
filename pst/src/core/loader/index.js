import { parser, controller } from '../';

let loaded = false;

/**
 * @param {function} callback
 */
async function loadPassiveData(callback) {
  await fetch('/treeData/nodeData.json').then(
    res => res.json(),
  ).then(
    response => callback.call(this, response),
    error => callback.call(this, error),
  );
}

async function loadAssets() { }

async function start() {
  if (loaded) return;

  await loadPassiveData(data => parser.init(data));

  loaded = true;
}

function finish() {
  return controller.NodeData;
}

export default {
  start,
  finish,
};
