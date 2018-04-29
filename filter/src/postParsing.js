const { parseMods } = require('../../mod');

function findMatches(sd) {
  const builder = {};

  sd.forEach((testAgainst) => {
    const newData = parseMods(testAgainst);

    if (newData !== null) {
      builder[newData[0]] = newData[1];
    }
  });

  return builder;
}

function nodeSdParse(nodes) {
  const newEntry = nodes;

  newEntry.forEach((node) => {
    if (typeof node.sd === 'undefined') return;
    const newSd = findMatches(node.sd);

    if (Object.keys(newSd).length === node.sd.length) {
      node.sd = newSd;
    } else {
      console.log(node.sd)
    }
  });

  return newEntry;
}

module.exports = {
  nodeSdParse,
};
