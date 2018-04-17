import Logger from '../utils/Logger';

Logger.register('frameRate', 'frame rendered in', 'ms');

export default class FrameProvider {
  constructor() {
    this.tabs = [];
    this.currentTab = undefined;
  }

  mountTabs(...tab) {
    this.tabs.push(...tab);
  }

  setPrimaryTab(tab) {
    this.currentTab = tab;
  }

  requestTick() {
    if (this.frameReady === false) {
      this.pendingTick = true;

      return;
    }

    this.tick();
  }

  tick() {
    this.frameReady = false;
    this.renderTab();
    requestAnimationFrame(() => this.afterTick());
  }

  afterTick() {
    this.frameReady = true;

    if (this.pendingTick) {
      this.pendingTick = false;
      this.requestTick();
    }
  }

  renderTab() {
    const performanceBefore = performance.now();

    this.currentTab.draw();

    const performanceAfter = performance.now();
    Logger.log('frameRate', (performanceAfter - performanceBefore).toFixed(3));
  }

  renderTabs() {
    const performanceBefore = performance.now();

    this.tabs.map(tab => tab.draw());

    const performanceAfter = performance.now();
    Logger.log('frameRate', (performanceAfter - performanceBefore).toFixed(3));
  }
}
