const nodeSkillSpriteParse = require('../post/nodeSkillSpriteParse');
const createScheme = require('../post/createScheme');
const groupToNode = require('../post/groupToNode');
const removeUnusedProperties = require('../post/removeUnusedProperties');
const moveToArray = require('../post/moveToArray');

const nodes = {
  any: {
    id: {
      useIf: 'number',
      newKey: 'a',
    },
    icon: {
      useIf: 'string',
      newKey: 'b',
      not: null,
      modify: str => str.replace('Art/2DArt/SkillIcons/passives/', '').replace('.png', ''),
    },
    ks: {
      useIf: true,
      newKey: 'c',
    },
    not: {
      useIf: true,
      newKey: 'd',
    },
    dn: {
      useIf: 'string',
      newKey: 'e',
      not: null,
    },
    m: {
      useIf: true,
      newKey: 'f',
    },
    isJewelSocket: {
      useIf: true,
      newKey: 'g',
    },
    isMultipleChoice: {
      useIf: true,
      newKey: 'h',
    },
    isMultipleChoiceOption: {
      useIf: true,
      newKey: 'i',
    },
    passivePointsGranted: {
      useIf: 'number',
      not: 0,
      newKey: 'j',
    },
    spc: {
      useIf: 'array',
      not: 0,
      newKey: 'k',
    },
    sd: {
      useIf: 'array',
      not: 0,
      newKey: 'l',
    },
    g: {
      useIf: 'number',
      not: 0,
      newKey: 'm',
    },
    o: {
      useIf: 'number',
      newKey: 'n',
    },
    oidx: {
      useIf: 'number',
      newKey: 'o',
    },
    sa: {
      useIf: 'number',
      not: 0,
      newKey: 'p',
    },
    da: {
      useIf: 'number',
      not: 0,
      newKey: 'q',
    },
    ia: {
      useIf: 'number',
      not: 0,
      newKey: 'r',
    },
    out: {
      useIf: 'array',
      not: 0,
      newKey: 's',
    },
    reminderText: {
      useIf: 'string',
      newKey: 't',
    },
    ascendancyName: {
      useIf: 'string',
      newKey: 'u',
    },
    isAscendancyStart: {
      useIf: true,
      newKey: 'v',
    },
    isAscendancy: {
      useIf: true,
      newKey: 'w',
    },
    flavourText: {
      useIf: 'array',
      not: 0,
      newKey: 'x',
    },
    in: {
      useIf: 'array',
      not: 0,
      newKey: 'y',
    },
    POST: [
      (obj) => nodeSkillSpriteParse(obj),
      (obj) => groupToNode(obj),
      (obj) => createScheme(obj),
      (obj) => removeUnusedProperties(obj),
      (obj) => moveToArray(obj),
    ],
  },
};

module.exports = nodes;
