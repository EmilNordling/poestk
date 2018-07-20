import { graph, popularizeTiles } from './graph';
import Emitter from '../Emitter';

async function init(nodeData) {
  await graph(nodeData);
  await popularizeTiles();

  Emitter.emit('__PARSE__FINISHED__');
}

export default {
  init,
};
