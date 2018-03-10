import $ from 'domtastic';

class Logger {
  constructor() {
    this.element = $('<debug class="debug"></debug>');
    this.element.css({
      'z-index': 999,
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: '#323640',
      'border-bottom': '2px solid #099aff',
      'box-sizing': 'border-box',
      padding: '15px',
      color: '#ffffff',
      'font-size': '14px',
      'user-select': 'none',
    });

    // $('body').append(this.element);

    this.tasks = {};
  }

  register(taskName, prefix, suffix) {
    const task = $(`<debug-data>${prefix || taskName}: <debug-value></debug-value> ${suffix || ''}</debug-data>`);
    task.css({
      display: 'block',
      'border-bottom': '1px solid #39393c',
      'margin-bottom': '4px',
      'padding-bottom': '4px',
    });

    this.tasks[taskName] = task;

    this.element.append(task);
  }

  log(name, task) {
    this.tasks[name].find('debug-value').text(task);
  }
}

export default new Logger();
