function removeUnusedProperties(nodes) {
  return new Promise(async (resolve, reject) => {
    try {
      Object.values(nodes).forEach((node) => {
        delete node.o
        delete node.n
      });

      resolve(nodes);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = removeUnusedProperties;
