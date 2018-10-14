interface CharData {

}

const characters = preval`
  const scion = require('./treeData/0.json');
  const marauder = require('./treeData/1.json');
  const ranger = require('./treeData/2.json');
  const witch = require('./treeData/3.json');
  const duelist = require('./treeData/4.json');
  const templar =  require('./treeData/5.json');
  const shadow = require('./treeData/6.json');
  const characterData = require('./treeData/characterData.json');

  const builder = characterData;

  builder['0'].name = scion.name;
  builder['0'].classes = scion.classes;

  builder['1'].name = marauder.name;
  builder['1'].classes = marauder.classes;

  builder['2'].name = ranger.name;
  builder['2'].classes = ranger.classes;

  builder['3'].name = witch.name;
  builder['3'].classes = witch.classes;

  builder['4'].name = duelist.name;
  builder['4'].classes = duelist.classes;

  builder['5'].name = templar.name;
  builder['5'].classes = templar.classes;

  builder['6'].name = shadow.name;
  builder['6'].classes = shadow.classes;

  module.exports = builder;
`;

export enum Characters {
  scion,
  marauder,
  ranger,
  witch,
  duelist,
  templar,
  shadow,
}

export default characters;
