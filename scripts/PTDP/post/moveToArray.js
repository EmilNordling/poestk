const { TEMP_OBJECT } = require('../constants');

function moveToArray(nodes) {
  return new Promise(async (resolve, reject) => {
    try {
      TEMP_OBJECT.nodes = Object.values(nodes);

      resolve(nodes);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = moveToArray;
