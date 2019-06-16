const Test = require('./Test');

const validateProperty = (obj, template) => new Test(obj, template, null).compare();

module.exports = validateProperty;
