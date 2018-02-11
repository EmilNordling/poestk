import { EventEmitter } from 'events';

const defaults = {
  element: '.pst',
};

const userSettingsDefaults = {
  camera: {
    x: 3000,
    y: 3000,
  },
  zoom: 0.2,
  treeURL: undefined,
  startClass: 'scion',
};

class UserSettings extends EventEmitter {
  constructor() {
    super();

    this.userSettings = localStorage.getItem('userSettings');

    if (!this.userSettings) {
      this.userSettings = userSettingsDefaults;
    }
  }
}

export { defaults, userSettingsDefaults };

export default new UserSettings();

