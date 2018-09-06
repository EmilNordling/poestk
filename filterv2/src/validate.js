const { each } = require('./helpers');
const Test = require('./Test');

function validate(object, template) {
  const test = new Test(object, template);

  each(object, key => test.check(key));

  return test.getObject();
}

module.exports = validate;
