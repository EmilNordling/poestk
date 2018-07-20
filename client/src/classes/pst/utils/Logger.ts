class Logger {
  tasks = {};

  register(taskName, prefix?, suffix?) {
    // const task = $(`<debug-data>${prefix || taskName}: <debug-value></debug-value> ${suffix || ''}</debug-data>`);
    // task.css({
    //   display: 'block',
    //   'border-bottom': '1px solid #39393c',
    //   'margin-bottom': '4px',
    //   'padding-bottom': '4px',
    // });

    // this.tasks[taskName] = task;
  }

  log(name, task) {
    // this.tasks[name].find('debug-value').text(task);
  }
}

export default new Logger();
