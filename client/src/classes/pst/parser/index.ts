import { graph, popularizeTiles } from './graph';
import Emitter from '../Emitter';
import controller from '../controller/index';

async function init(nodeData) {
  await graph(nodeData);
  await popularizeTiles();

  console.log(controller.NodeData.nodes)

  Emitter.emit('__PARSE__FINISHED__');
}

export default {
  init,
};
