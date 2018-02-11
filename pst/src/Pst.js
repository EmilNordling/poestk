import $ from 'domtastic';
// import Core from './core/Pst.Core';
// import Viewport from './core/Viewport';

import Core from './corev2/Core';
import View from './corev2/viewport/View';

class Pst extends Core {
  onLoad() {
    this.element = $(this.config.element);
    this.interface = new View(this.element);
  }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Pst;
  module.exports = Core;
  module.exports = View;
} else {
  window.Pst = Pst;
}
