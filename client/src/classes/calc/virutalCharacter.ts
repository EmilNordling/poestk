import { characters } from '../pst';
import { observable, IObservableObject } from 'mobx';
import { Characters } from '../pst/characters';

type resistances = Array<number>;
type stats = {
  display: number,
  flat: {
    min: number | null;
    max: number | null;
  },

};

export interface DisplayCharacter {
  classID: number;
  selectedAsendency: null | number;
  ascendancies: any;
  level: number;
  accuracyRating: number;
  life: number;
  mana: number;
  evasion: number;
  fireResistance: resistances;
  coldResistance: resistances;
  lightningResistance: resistances;
  chaosResistance: resistances;
}

type CharacterBase = {
  character: Characters,
  dex: number,
  int: number,
  str: number,
  ascendancies: any,
};

export class Character {
  public observableDisplays: DisplayCharacter;
  private classID: number;
  private ascendancies: any;

  constructor(base: CharacterBase) {
    this.classID = base.character;
    this.ascendancies = base.ascendancies;
  }

  public getObservable() {
    this.observableDisplays = observable<DisplayCharacter>({
      classID: this.classID,
      selectedAsendency: null,
      ascendancies: this.ascendancies,
      level: 1,
      accuracyRating: 0,
      life: 50,
      mana: 40,
      evasion: 53,
      fireResistance: [75, 0],
      coldResistance: [75, 0],
      lightningResistance: [75, 0],
      chaosResistance: [75, 0],
    });

    return this.observableDisplays;
  }
}

function getNewCharacter(character: Characters) {
  const { base_dex, base_int, base_str, classes } = characters[character];

  return new Character({
    character: character,
    dex: base_dex,
    int: base_int,
    str: base_str,
    ascendancies: classes,
  });
}

export default getNewCharacter;
