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
  parser: (() => number) | null;
  sources: Array<any>;
  push: Array<string> | null;
  pull: Array<string> | null;
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

function getStats(value?: number, parseFN?: () => number): VirutalModifier {
  return {
    addedFlat: value ? value : 0,
    increased: 0,
    reduced: 0,
    more: 0,
    less: 0,
    display: null,
    parser: parseFN ? parseFN : null,
    sources: [],
    push: null,
    pull: null,
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
    parser: stat.parser,
    sources: [],
    push: stat.push,
    pull: stat.pull,
  };
}

export function updateStat(virutalCharacter: VirutalCharacter, dataNode: TreeDataNode, subtract = false): VirutalCharacter {
  const builder = virutalCharacter;

  dataNode.data.forEach(VirutalStat => {
    if (VirutalStat === null) return;

    Object.keys(VirutalStat.modifier).forEach((modifier) => {
      Object.keys(VirutalStat.modifier[modifier]).forEach((stat) => {
        let newStat = builder.stats[modifier];

        if (typeof newStat === 'undefined') {
          builder.stats[modifier] = getStats();
          newStat = builder.stats[modifier];
        }

        if (subtract) {
          newStat[stat] -= VirutalStat.modifier[modifier][stat];
        } else {
          newStat[stat] += VirutalStat.modifier[modifier][stat];
        }

        builder.stats[modifier] = parseStats(newStat);
      });
    });
  });

  return builder;
}

export function parseAll(virutalCharacter: VirutalCharacter): VirutalCharacter {
  const builder = virutalCharacter;

  const stats = Object.keys(builder.stats).map(stat => {
    builder.stats[stat].display = null;

    return stat;
  });

  while (stats.length > 0) {
    const stat = stats.pop();

    builder.stats[stat!] = parseStats(builder.stats[stat!]);
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
      accuracyRating: getStats(0, () => 0),
      life: getStats(50, () => 0),
      mana: getStats(40, () => 0),
      energyShield: getStats(0, () => 0),
      evasion: getStats(53, () => 0),
      armour: getStats(0),
      dexterity: getStats(base_dex),
      strength: getStats(base_int),
      intelligence: getStats(base_str),
    },
    context: {
      melee: {
        physicalDamage: getStats(0, () => 0),
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
