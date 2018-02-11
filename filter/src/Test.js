const { has, each } = require('./helpers');
const AppError = require('./error');

const test = (testingKey, matchAgainst, doNotMatchAgainst) => {
  let testMatchAgainst = matchAgainst;
  let matches = 0;

  if (!Array.isArray(testMatchAgainst)) testMatchAgainst = [testMatchAgainst];

  testMatchAgainst.forEach((item) => {
    if (item === testingKey && testingKey !== doNotMatchAgainst) {
      matches += 1;
    } else if (item === 'any') {
      matches += 1;
    } else if (item === 'array' && Array.isArray(testingKey) && testingKey.length !== doNotMatchAgainst) {
      matches += 1;
    } else {
      const typeOfKey = typeof testingKey;
      ['object', 'function', 'string', 'number', 'boolean'].forEach((check) => {
        if (typeOfKey === check && item === check && testingKey !== doNotMatchAgainst) {
          matches += 1;
        }
      });
    }
  });

  return matches > 0;
};

class Test {
  constructor(object, template) {
    this.object = object;
    this.template = template;
    this.newObject = {};
  }

  check(key) {
    if (has(this.object, key) && has(this.template, key)) {
      if (typeof this.template[key] === 'object' && !Array.isArray(this.template[key])) {
        this.isObject(key);

        return;
      }
      this.testKey(key);

      return;
    }

    if (has(this.template, 'any')) {
      let buildTemplate = {};

      if (has(this.template.any, 'any')) {
        each(this.object[key], (deepKey) => {
          buildTemplate[deepKey] = this.template.any.any;
        });
      } else {
        buildTemplate = this.template.any;
      }

      const deepTest = new Test(this.object[key], buildTemplate);

      each(this.object[key], deepKey => deepTest.check(deepKey));

      this.addNewKey(key, deepTest.getObject());

      return;
    }

    throw new AppError(`Template is missing "${key}" entry`);
  }

  isObject(key) {
    if (has(this.template[key], 'useIf')) {
      this.testKey(key, this.template[key].useIf);
    } else {
      const deepTest = new Test(this.object[key], this.template[key]);

      each(this.object[key], deepKey => deepTest.check(deepKey));

      this.addNewKey(key, deepTest.getObject());
    }
  }

  testKey(key, tstRef) {
    const testReference = test(
      this.object[key],
      tstRef || this.template[key],
      this.template[key].not,
    );

    if (testReference) {
      this.addNewKey(key);
    }

    return testReference;
  }

  addNewKey(key, forcedValue) {
    let newKeyObject = key;
    let newKeyValue = forcedValue || this.object[key];

    if (has(this.template[key], 'modify')) {
      newKeyValue = this.template[key].modify(newKeyValue);
    }

    if (has(this.template[key], 'newKey')) {
      newKeyObject = this.template[key].newKey;
    }

    this.newObject[newKeyObject] = newKeyValue;
  }

  getObject() {
    return this.newObject;
  }
}

module.exports = Test;
