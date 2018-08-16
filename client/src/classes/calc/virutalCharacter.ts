import { characters } from '../pst';
import { Characters } from '../pst/characters';
import { statsStack } from './genericCalculations';
import { TreeDataNode } from './parseData';

interface VirutalModifier {
  addedFlat: number;
  increased: number;
  reduced: number;
  more: number;
  less: number;
  display: number | null;
  sources: Array<any>;
  push: Array<string> | null;
  pull: Array<string> | null;
  pipe: any;
  bindPaths: string[];
}

interface VirutalContexStats {
  [context: string]: {
    [modifier: string]: VirutalModifier;
  };
}

interface VirutalStats {
  accuracyRating: VirutalModifier;
  life: VirutalModifier;
  mana: VirutalModifier;
  energyShield: VirutalModifier;
  evasion: VirutalModifier;
  armour: VirutalModifier;
  dexterity: VirutalModifier;
  strength: VirutalModifier;
  intelligence: VirutalModifier;
  [modifier: string]: VirutalModifier;
}

interface VirutalResistances {
  fireResistance: [number, number];
  coldResistance: [number, number];
  lightningResistance: [number, number];
  chaosResistance: [number, number];
}

export interface VirutalCharacter {
  selectedAsendency: null | 1 | 2 | 3;
  classID: number;
  level: number;
  stats: VirutalStats;
  context: VirutalContexStats;
  resistances: VirutalResistances;
}

function getStats(value?: number, pipe?: any): VirutalModifier {
  return {
    addedFlat: value ? value : 0,
    increased: 0,
    reduced: 0,
    more: 0,
    less: 0,
    display: null,
    sources: [],
    push: null,
    pull: null,
    pipe: pipe,
    bindPaths: [],
  };
}

function parseWithProxy(stat: VirutalModifier, proxyValue: any): VirutalModifier {
  const destruct: any = {
    addedFlat: stat.addedFlat,
    increased: stat.increased,
    reduced: stat.reduced,
    more: stat.more,
    less: stat.less,
  };

  destruct[proxyValue[0]] = destruct[proxyValue[0]] + proxyValue[1];

  const display = Math.floor(statsStack(
    destruct.addedFlat,
    destruct.increased,
    destruct.reduced,
    destruct.more,
    destruct.less,
  ));

  return {
    addedFlat: stat.addedFlat,
    increased: stat.increased,
    reduced: stat.reduced,
    more: stat.more,
    less: stat.less,
    display: display,
    sources: [],
    push: stat.push,
    pull: stat.pull,
    pipe: stat.pipe,
    bindPaths: stat.bindPaths,
  };
}

function parseStats(stat: VirutalModifier): VirutalModifier {
  const display = Math.floor(statsStack(
    stat.addedFlat,
    stat.increased,
    stat.reduced,
    stat.more,
    stat.less,
  ));

  return {
    addedFlat: stat.addedFlat,
    increased: stat.increased,
    reduced: stat.reduced,
    more: stat.more,
    less: stat.less,
    display: display,
    sources: [],
    push: stat.push,
    pull: stat.pull,
    pipe: stat.pipe,
    bindPaths: stat.bindPaths,
  };
}

function deepLookup(obj: any, _path: string, ignore?: number) {
  const path = _path.split('.');
  const length = ignore ? path.length - ignore : path.length;

  for (let index = 0; index < length; index++) {
    obj = obj[path[index]];
  }

  return obj;
}

function pipe(virutalCharacter: VirutalCharacter, pipe: any): Array<any> | boolean | null {
  if (typeof pipe === 'undefined') return null;

  const valueFromPath = deepLookup(virutalCharacter, pipe[0][0]);

  if (typeof valueFromPath === 'undefined') return false;

  return [pipe[0][2], pipe[0][1](valueFromPath)];
}

export function updateStat(virutalCharacter: VirutalCharacter, dataNode: TreeDataNode, subtract = false): VirutalCharacter {
  const builder = virutalCharacter;

  dataNode.data.forEach(virutalStat => {
    if (virutalStat === null) return;

    Object.keys(virutalStat.modifier).forEach((modifier) => {
      Object.keys(virutalStat.modifier[modifier]).forEach((stat) => {
        let newStat = builder.stats[modifier];

        if (typeof newStat === 'undefined') {
          builder.stats[modifier] = getStats();
          newStat = builder.stats[modifier];
        }

        if (subtract) {
          newStat[stat] -= virutalStat.modifier[modifier][stat];
        } else {
          newStat[stat] += virutalStat.modifier[modifier][stat];
        }

        const pipeResult = pipe(virutalCharacter, newStat.pipe);

        if (pipeResult === false) {
          console.error('hmm');
        } else if (pipeResult === null) {
          builder.stats[modifier] = parseStats(newStat);
        } else {
          builder.stats[modifier] = parseWithProxy(newStat, pipeResult);
        }

        if (newStat.bindPaths.length > 0) {
          newStat.bindPaths.forEach((stat) => {
            const bindedStat = builder.stats[stat];
            const pipeResult = pipe(virutalCharacter, bindedStat.pipe);

            if (pipeResult === false) {
              console.error('hmm');
            } else if (pipeResult === null) {
              builder.stats[stat] = parseStats(bindedStat);
            } else {
              builder.stats[stat] = parseWithProxy(bindedStat, pipeResult);
            }
          });
        }
      });
    });
  });

  return builder;
}

function createBinding(modifer: VirutalModifier, bindTo: string) {
  modifer.bindPaths.push(bindTo);
}

export function parseAll(virutalCharacter: VirutalCharacter): VirutalCharacter {
  const builder = virutalCharacter;

  const stats = Object.keys(builder.stats).map(stat => {
    builder.stats[stat].display = null;

    return stat;
  });

  while (stats.length > 0) {
    const stat = stats.pop();

    const pipeResult = pipe(virutalCharacter, builder.stats[stat!].pipe);

    if (pipeResult === false) {
      console.error('hmm');
    } else if (pipeResult === null) {
      builder.stats[stat!] = parseStats(builder.stats[stat!]);
    } else {
      createBinding(deepLookup(builder, builder.stats[stat!].pipe[0][0], 1), stat!);

      builder.stats[stat!] = parseWithProxy(builder.stats[stat!], pipeResult);
    }
  }

  return builder;
}

export function getNewCharacter(character: Characters): VirutalCharacter {
  const { base_dex, base_int, base_str } = characters[character];

  const builder: VirutalCharacter = {
    selectedAsendency: null,
    classID: character,
    level: 1,
    stats: {
      accuracyRating: getStats(0, [['stats.dexterity.display', (val: number) => Math.floor(val / 2) * 20, 'addedFlat']]),
      life: getStats(50, [['stats.strength.display', (val: number) => Math.floor(val / 10) * 5, 'addedFlat']]),
      mana: getStats(40, [['stats.intelligence.display', (val: number) => Math.floor(val / 10) * 5, 'addedFlat']]),
      energyShield: getStats(0, [['stats.intelligence.display', (val: number) => Math.floor(val / 2) * 5, 'increased']]),
      evasion: getStats(53, [['stats.dexterity.display', (val: number) => Math.floor(val / 2) * 5, 'increased']]),
      armour: getStats(0),
      dexterity: getStats(base_dex),
      strength: getStats(base_int),
      intelligence: getStats(base_str),
    },
    context: {
      melee: {
        physicalDamage: getStats(0, [['stats.strength.display', (val: number) => Math.floor(val / 10) * 5, 'addedFlat']]),
      },
    },
    resistances: {
      fireResistance: [75, 0],
      coldResistance: [75, 0],
      lightningResistance: [75, 0],
      chaosResistance: [75, 0],
    },
  };

  return parseAll(builder);
}

export default getNewCharacter;
