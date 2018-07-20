import GuiStore from './GUIStore';
import AuthStore from './AuthStore';
import StatsStore from './StatsStore';
import BuildStore from './BuildStore';

const guiStore = new GuiStore();
const authStore = new AuthStore();
const statsStore = new StatsStore();
const buildStore = new BuildStore();

export { default as GuiStore } from './GUIStore';
export { default as AuthStore } from './AuthStore';
export { default as StatsStore } from './StatsStore';
export { default as BuildStore } from './BuildStore';

export {
  guiStore,
  authStore,
  statsStore,
  buildStore,
};

export default {
  guiStore,
  authStore,
  statsStore,
  buildStore,
};
