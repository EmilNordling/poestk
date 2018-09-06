const chalk = require('chalk');

class AppError extends Error {
  constructor(message) {
    super(message);

    this.name = `${chalk.red('ERROR')}`;
    this.message = message;

    Error.captureStackTrace(this, this.constructor.name);
  }
}

module.exports = AppError;
