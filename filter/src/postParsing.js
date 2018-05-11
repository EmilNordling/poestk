const jsonfile = require('jsonfile');
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

function nodeSkillSpriteParse(nodes) {
  return new Promise((resolve, reject) => {
    const newEntry = nodes;

    jsonfile.readFile('dist/skillSprites.json', (err, skillSpritesData) => {
      if (err) reject(err);

      newEntry.forEach((node) => {
        let constrains;

        if (node.not === true) {
          constrains = skillSpritesData.notableActive[2].coords[`Art/2DArt/SkillIcons/passives/${node.ni}.png`];
        } else if (node.ks === true) {
          constrains = skillSpritesData.keystoneActive[2].coords[`Art/2DArt/SkillIcons/passives/${node.ni}.png`];
        } else if (node.m === true) {
          constrains = skillSpritesData.mastery[2].coords[`Art/2DArt/SkillIcons/passives/${node.ni}.png`];
        } else {
          constrains = skillSpritesData.normalActive[2].coords[`Art/2DArt/SkillIcons/passives/${node.ni}.png`];
        }

        if (typeof constrains === 'undefined') console.log(node);

        node['s'] = Object.values(constrains);
      });

      resolve(newEntry);
    });
  });
}

module.exports = {
  nodeSdParse,
  nodeSkillSpriteParse,
};
