const { nodeSdParse, nodeSkillSpriteParse } = require('./postParsing');

const nodes = {
  id: 'number',
  icon: {
    useIf: 'string',
    newKey: 'ni',
    not: null,
    modify: strng => strng.replace('Art/2DArt/SkillIcons/passives/', '').replace('.png', ''),
  },
  ks: {
    useIf: true,
  },
  not: {
    useIf: true,
  },
  dn: {
    useIf: 'string',
    not: null,
  },
  m: {
    useIf: true,
  },
  isJewelSocket: {
    useIf: true,
  },
  isMultipleChoice: {
    useIf: true,
  },
  isMultipleChoiceOption: {
    useIf: true,
  },
  passivePointsGranted: {
    useIf: 'number',
    not: 0,
  },
  da: {
    useIf: 'number',
    not: 0,
  },
  spc: {
    useIf: 'array',
    not: 0,
  },
  sd: {
    useIf: 'array',
    not: 0,
  },
  g: {
    useIf: 'number',
    not: 0,
  },
  o: {
    useIf: 'number',
    not: 0,
  },
  oidx: {
    useIf: 'number',
    not: 0,
  },
  sa: {
    useIf: 'number',
    not: 0,
  },
  ia: {
    useIf: 'number',
    not: 0,
  },
  out: {
    useIf: 'array',
    not: 0,
  },
  reminderText: {
    useIf: 'string',
  },
  ascendancyName: {
    useIf: 'string',
  },
  isAscendancyStart: {
    useIf: true,
  },
  isAscendancy: {
    useIf: true,
  },
  flavourText: {
    useIf: 'array',
  },
  POST: (obj, key, value) => {
    const finalConfig = nodeSdParse(obj, key, value);

    return nodeSkillSpriteParse(finalConfig);
  },
};

const assets = {
  any: {
    any: {
      useIf: 'string',
      modify: newString => newString.replace(/\/gen\/image\/.*\//g, ''),
    },
  },
};

module.exports = {
  nodes,
  assets,
};
