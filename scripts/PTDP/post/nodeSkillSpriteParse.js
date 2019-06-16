const jsonfile = require('jsonfile');
const { DIST_LOCATION } = require('../constants');

function nodeSkillSpriteParse(nodes) {
  return new Promise((resolve, reject) => {
    const newEntry = Object.values(nodes);

    jsonfile.readFile(`${DIST_LOCATION}/skillSprites.json`, (err, skillSpritesData) => {
      if (err) {
        reject(err);
      } else {
        newEntry.forEach((node) => {
          let constrains;

          // node.b = "ni"
          // node.d = "not"
          // node.ks = "c"
          // node.m = "f"
          if (node.d === true) {
            constrains = skillSpritesData.notableActive[2].coords[`Art/2DArt/SkillIcons/passives/${node.b}.png`];
          } else if (node.c === true) {
            constrains = skillSpritesData.keystoneActive[2].coords[`Art/2DArt/SkillIcons/passives/${node.b}.png`];
          } else if (node.f === true) {
            constrains = skillSpritesData.mastery[2].coords[`Art/2DArt/SkillIcons/passives/${node.b}.png`];
          } else {
            constrains = skillSpritesData.normalActive[2].coords[`Art/2DArt/SkillIcons/passives/${node.b}.png`];
          }

          if (typeof constrains === 'undefined') console.log(node);

          node['z'] = Object.values(constrains);
        });

        resolve(newEntry);
      }
    });
  });
}

module.exports = nodeSkillSpriteParse;
