import Controller from '../controller';
import { parser } from '../';

let loaded = false;

async function loadPassiveData(callback) {
  await fetch('/treeData/nodeData.json').then(
    res => res.json(),
  ).then(
    response => callback.call(this, response),
    error => callback.call(this, error),
  );
}

function loadAssets(src) {
  return new Promise((resolve, reject) => {
    Controller.assets.skills = new Image();
    Controller.assets.skills.onload = () => resolve(Controller.assets.skills);
    Controller.assets.skills.onerror = error => reject(error);
    Controller.assets.skills.src = src;
  });
}

async function start() {
  if (loaded) return;

  try {
    // temp name on image
    await loadAssets('/treeData/skills-2.jpg');
    await loadPassiveData(data => parser.init(data));

    loaded = true;
  } catch (error) {
    console.error(error);
  }
}

function finish() {
  return Controller.NodeData;
}

export default {
  start,
  finish,
};
