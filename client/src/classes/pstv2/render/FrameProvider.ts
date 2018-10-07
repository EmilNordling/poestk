import State from '../State';

class FrameProvider {
  public frameReady: boolean;
  public pendingTick: boolean;
  public currentTab: () => void;

  requestTick() {
    if (State.selectedTab === null) return;

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

    this.currentTab();

    const performanceAfter = performance.now();
  }
}

export default FrameProvider;
