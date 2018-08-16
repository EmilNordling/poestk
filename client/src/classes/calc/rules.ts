import { Spec, Node } from './parseData';

export enum RuleType {
  special = 'special',
  action = 'action',
  modifier = 'modifier',
  context = 'context',
  condition = 'condition',
  abstract = 'abstract',
}

export type Rules = {
  [rule: string]: Rule,
};

export interface Rule {
  readonly name: string;
  readonly pattern: RegExp;
  readonly group: RuleType;
  parse: (startIndex: number, endIndex: number, node?: Node) => Spec;
}

// Going to use multiple classes for each type for now since RegExp Named
// Capture Groups lacks good implementation for now.
// https://github.com/tc39/proposal-regexp-named-groups

// Stuff that will be removed when a proper AST is in place
class AttackAnd implements Rule {
  readonly name = 'attackSpeed';
  readonly pattern = /^attack and[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

// Special
class And implements Rule {
  readonly name = 'and';
  readonly pattern = /^and[\s]?/;
  readonly group = RuleType.special;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

// Actions
class AddedFlat implements Rule {
  readonly name = 'addedFlat';
  readonly pattern = /^[+#0-9]* to[\s]?/;
  readonly group = RuleType.action;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class Increased implements Rule {
  readonly name = 'increased';
  readonly pattern = /^[#0-9]*% increased[\s]?/;
  readonly group = RuleType.action;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class Of implements Rule {
  readonly name = 'of';
  readonly pattern = /^[#0-9]*% of[\s]?/;
  readonly group = RuleType.action;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

// Modifiers
class FireDamage implements Rule {
  readonly name = 'fireDamage';
  readonly pattern = /^fire damage[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class ColdDamage implements Rule {
  readonly name = 'coldDamage';
  readonly pattern = /^cold damage[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class LightningDamage implements Rule {
  readonly name = 'fireDamage';
  readonly pattern = /^lightning damage[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class ElementalDamage implements Rule {
  readonly name = 'elementalDamage';
  readonly pattern = /^elemental damage[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class ChaosDamage implements Rule {
  readonly name = 'chaosDamage';
  readonly pattern = /^chaos damage[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class PhysicalDamage implements Rule {
  readonly name = 'physicalDamage';
  readonly pattern = /^physical damage[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class AreaDamage implements Rule {
  readonly name = 'areaDamage';
  readonly pattern = /^area damage[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class AreaOfEffect implements Rule {
  readonly name = 'aoe';
  readonly pattern = /^area of effect[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class SpellDamage implements Rule {
  readonly name = 'spellDamage';
  readonly pattern = /^spell damage[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class DoT implements Rule {
  readonly name = 'DoT';
  readonly pattern = /^damage over time[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class CastSpeed implements Rule {
  readonly name = 'castSpeed';
  readonly pattern = /^cast speed[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class AttackSpeed implements Rule {
  readonly name = 'attackSpeed';
  readonly pattern = /^attack speed[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class MovementSpeed implements Rule {
  readonly name = 'movementSpeed';
  readonly pattern = /^movement speed[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class MaximumLife implements Rule {
  readonly name = 'life';
  readonly pattern = /^maximum life[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class LifeRegeneratedPerSecond implements Rule {
  readonly name = 'lifeRegeneratedPerSecond';
  readonly pattern = /^life regenerated per second[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class MaximumMana implements Rule {
  readonly name = 'mana';
  readonly pattern = /^maximum mana[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class ManaRegenerationRate implements Rule {
  readonly name = 'manaRegenerationRate';
  readonly pattern = /^mana regeneration rate[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class MaximumEnergyShield implements Rule {
  readonly name = 'energyShield';
  readonly pattern = /^maximum energy shield[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class EvasionRating implements Rule {
  readonly name = 'evasionRating';
  readonly pattern = /^evasion rating[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class Damage implements Rule {
  readonly name = 'damage';
  readonly pattern = /^damage[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class Intelligence implements Rule {
  readonly name = 'intelligence';
  readonly pattern = /^intelligence[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class Strength implements Rule {
  readonly name = 'strength';
  readonly pattern = /^strength[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class Dexterity implements Rule {
  readonly name = 'dexterity';
  readonly pattern = /^dexterity[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class AccuracyRating implements Rule {
  readonly name = 'accuracyRating';
  readonly pattern = /^accuracy rating[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class Ailments implements Rule {
  readonly name = 'ailmentsFromAttackSkills';
  readonly pattern = /^with ailments from attack skills[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class Armour implements Rule {
  readonly name = 'armour';
  readonly pattern = /^armour[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class MineDamage implements Rule {
  readonly name = 'mineDamage';
  readonly pattern = /^mine damage[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class CriticalStrikeChance implements Rule {
  readonly name = 'criticalStrikeChance';
  readonly pattern = /^critical strike chance[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class CriticalStrikeMultiplier implements Rule {
  readonly name = 'criticalStrikeMultiplier';
  readonly pattern = /^critical strike multiplier[\s]?/;
  readonly group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

// context
class Minion implements Rule {
  readonly name = 'minion';
  readonly pattern = /^minions (have|deal)[\s]?/;
  readonly group = RuleType.context;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class Melee implements Rule {
  readonly name = 'melee';
  readonly pattern = /^melee[\s]?/;
  readonly group = RuleType.context;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class Maces implements Rule {
  readonly name = 'maces';
  readonly pattern = /^with maces[\s]?/;
  readonly group = RuleType.context;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class Axes implements Rule {
  readonly name = 'axes';
  readonly pattern = /^with axes[\s]?/;
  readonly group = RuleType.context;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class Swords implements Rule {
  readonly name = 'swords';
  readonly pattern = /^with swords[\s]?/;
  readonly group = RuleType.context;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class Bows implements Rule {
  readonly name = 'bows';
  readonly pattern = /^with bows[\s]?/;
  readonly group = RuleType.context;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

export default {
  // Actions
  addedFlat: new AddedFlat(),
  increased: new Increased(),
  of: new Of(),

  // Special
  and: new And(),

  // Modifiers
  // - life n such
  maximumLife: new MaximumLife(),
  maximumMana: new MaximumMana(),
  maximumEnergyShield: new MaximumEnergyShield(),
  evasionRating: new EvasionRating(),
  manaRegenerationRate: new ManaRegenerationRate(),
  lifeRegeneratedPerSecond: new LifeRegeneratedPerSecond(),
  armour: new Armour(),

  // - stats
  intelligence: new Intelligence(),
  strength: new Strength(),
  dexterity: new Dexterity(),

  // - speed
  castSpeed: new CastSpeed(),
  attackSpeed: new AttackSpeed(),
  movementSpeed: new MovementSpeed(),

  // - damage
  areaDamage: new AreaDamage(),
  areaOfEffect: new AreaOfEffect(),
  spellDamage: new SpellDamage(),
  fireDamage: new FireDamage(),
  coldDamage: new ColdDamage(),
  lightningDamage: new LightningDamage(),
  elementalDamage: new ElementalDamage(),
  chaosDamage: new ChaosDamage(),
  physicalDamage: new PhysicalDamage(),
  dot: new DoT(),
  damage: new Damage(),
  mineDamage: new MineDamage(),
  mineLayingSpeed: new MineDamage(),
  mineDuration: new MineDamage(),
  trapDamage: new MineDamage(),
  trapCooldown: new MineDamage(),

  // - misc
  accuracyRating: new AccuracyRating(),
  ailmentsFromAttackSkills: new Ailments(),

  // Context
  melee: new Melee(),
  maces: new Maces(),
  axes: new Axes(),
  swords: new Swords(),
  bows: new Bows(),
  minion: new Minion(),

  // TO BE REMOVED
  attack: new AttackAnd(),
} as Rules;
