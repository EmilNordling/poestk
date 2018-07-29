import { Spec } from './parseData';

export enum RuleType {
  action = 'action',
  modifier = 'modifier',
  context = 'context',
  condition = 'condition',
}

export type Rules = {
  [rule: string]: Rule,
};

export interface Rule {
  name: string;
  pattern: RegExp;
  group: RuleType;
  parse: (startIndex: number, endIndex: number) => Spec;
}

// Going to use multiple classes for each type for now since RegExp Named
// Capture Groups lacks good implementation for now.
// https://github.com/tc39/proposal-regexp-named-groups

// Actions
class AddedFlat implements Rule {
  public name = 'addedFlat';
  public pattern = /^[+#0-9]* to[\s]?/;
  public group = RuleType.action;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class Increased implements Rule {
  public name = 'increased';
  public pattern = /^[#0-9]*% increased[\s]?/;
  public group = RuleType.action;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class Of implements Rule {
  public name = 'of';
  public pattern = /^[#0-9]*% of[\s]?/;
  public group = RuleType.action;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

// Modifiers
class FireDamage implements Rule {
  public name = 'fireDamage';
  public pattern = /^fire damage[\s]?/;
  public group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class ColdDamage implements Rule {
  public name = 'coldDamage';
  public pattern = /^cold damage[\s]?/;
  public group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class LightningDamage implements Rule {
  public name = 'fireDamage';
  public pattern = /^lightning damage[\s]?/;
  public group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class ElementalDamage implements Rule {
  public name = 'elementalDamage';
  public pattern = /^elemental damage[\s]?/;
  public group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class ChaosDamage implements Rule {
  public name = 'chaosDamage';
  public pattern = /^chaos damage[\s]?/;
  public group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class PhysicalDamage implements Rule {
  public name = 'physicalDamage';
  public pattern = /^physical damage[\s]?/;
  public group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class AreaDamage implements Rule {
  public name = 'areaDamage';
  public pattern = /^area damage[\s]?/;
  public group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class SpellDamage implements Rule {
  public name = 'spellDamage';
  public pattern = /^spell damage[\s]?/;
  public group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class DoT implements Rule {
  public name = 'DoT';
  public pattern = /^damage over time[\s]?/;
  public group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class CastSpeed implements Rule {
  public name = 'castSpeed';
  public pattern = /^cast speed[\s]?/;
  public group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class AttackSpeed implements Rule {
  public name = 'attackSpeed';
  public pattern = /^attack speed[\s]?/;
  public group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class MovementSpeed implements Rule {
  public name = 'movementSpeed';
  public pattern = /^movement speed[\s]?/;
  public group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class MaximumLife implements Rule {
  public name = 'life';
  public pattern = /^maximum life[\s]?/;
  public group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class LifeRegeneratedPerSecond implements Rule {
  public name = 'lifeRegeneratedPerSecond';
  public pattern = /^life regenerated per second[\s]?/;
  public group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class MaximumMana implements Rule {
  public name = 'mana';
  public pattern = /^maximum mana[\s]?/;
  public group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class ManaRegenerationRate implements Rule {
  public name = 'manaRegenerationRate';
  public pattern = /^mana regeneration rate[\s]?/;
  public group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class MaximumEnergyShield implements Rule {
  public name = 'energyShield';
  public pattern = /^maximum energy shield[\s]?/;
  public group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class EvasionRating implements Rule {
  public name = 'evasionRating';
  public pattern = /^evasion rating[\s]?/;
  public group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class Damage implements Rule {
  public name = 'damage';
  public pattern = /^damage[\s]?/;
  public group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class Intelligence implements Rule {
  public name = 'intelligence';
  public pattern = /^intelligence[\s]?/;
  public group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class Strength implements Rule {
  public name = 'strength';
  public pattern = /^strength[\s]?/;
  public group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class Dexterity implements Rule {
  public name = 'dexterity';
  public pattern = /^dexterity[\s]?/;
  public group = RuleType.modifier;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

// context
//

class Melee implements Rule {
  public name = 'melee';
  public pattern = /^melee[\s]?/;
  public group = RuleType.context;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class Maces implements Rule {
  public name = 'maces';
  public pattern = /^with maces[\s]?/;
  public group = RuleType.context;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class Axes implements Rule {
  public name = 'axes';
  public pattern = /^with axes[\s]?/;
  public group = RuleType.context;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class Swords implements Rule {
  public name = 'swords';
  public pattern = /^with swords[\s]?/;
  public group = RuleType.context;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

class Bows implements Rule {
  public name = 'bows';
  public pattern = /^with bows[\s]?/;
  public group = RuleType.context;

  public parse(startIndex: number, endIndex: number) {
    return new Spec(null, startIndex, endIndex);
  }
}

export default {
  // Actions
  addedFlat: new AddedFlat(),
  increased: new Increased(),
  of: new Of(),

  // Modifiers
  // - life n such
  maximumLife: new MaximumLife(),
  maximumMana: new MaximumMana(),
  maximumEnergyShield: new MaximumEnergyShield(),
  evasionRating: new EvasionRating(),
  manaRegenerationRate: new ManaRegenerationRate(),
  lifeRegeneratedPerSecond: new LifeRegeneratedPerSecond(),

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
  spellDamage: new SpellDamage(),
  fireDamage: new FireDamage(),
  coldDamage: new ColdDamage(),
  lightningDamage: new LightningDamage(),
  elementalDamage: new ElementalDamage(),
  chaosDamage: new ChaosDamage(),
  physicalDamage: new PhysicalDamage(),
  dot: new DoT(),
  damage: new Damage(),

  // Context
  melee: new Melee(),
  maces: new Maces(),
  axes: new Axes(),
  swords: new Swords(),
  bows: new Bows(),
} as Rules;
