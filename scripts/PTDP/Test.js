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
    this._object = object;
    this._template = template;
    this._newObject = {};

    return this;
  }

  compare() {
    // If template got a key any it should treat all keys the same.
    if (typeof this._template.any !== 'undefined') {
      const deepTemplate = this._template.any;

      let newObject = {}

      Object.entries(this._object).map(([key, value]) => {
        newObject[key] = new Test(value, deepTemplate, key).compare();
      });

      return newObject;
    }

    Object.entries(this._object).map(([key, value]) => {
      const template = this._template[key];

      if (template) {
        this._testValue(key, value, template);

        return;
      }

      throw new Error(`Key "${key}" is missing in template`);
    });

    return this._newObject;
  }

  _testValue(key, value, template) {
    let testReference;
    let doNotMatchAgainst;

    if (template instanceof Object) {
      if (template.useIf) {
        testReference = template.useIf;

        if (typeof template.not !== 'undefined') {
          doNotMatchAgainst = template.not;
        }
      } else {
        console.log('xD')

        return;
      }
    }

    if (doNotMatchAgainst === undefined) doNotMatchAgainst = 'SKIP';

    const match = test(value, testReference, doNotMatchAgainst);

    if (match) {
      this._addNewKey(key, value, template);
    }
  }

  _addNewKey(key, value, template, forcedValue) {
    let newKey = key;
    let newValue = forcedValue || value;

    if (typeof template.modify !== 'undefined') {
      newValue = template.modify(newValue);
    }

    if (typeof template.newKey !== 'undefined') {
      newKey = template.newKey;
    }

    this._newObject[newKey] = newValue;
  }
}

module.exports = Test;
