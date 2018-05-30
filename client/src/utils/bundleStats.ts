import { scheme } from '../../../mod/scheme'

export interface Bundle {

}

export type baseStats = {
  base_str: number,
  base_dex: number,
  base_int: number,
}

export interface CharacterData {
  0: baseStats,
  1: baseStats,
  2: baseStats,
  3: baseStats,
  4: baseStats,
  5: baseStats,
  6: baseStats,
  [key: number]: baseStats,
}
// load from filter parse instead
export const characterData: CharacterData = {
  0: {
    base_str: 20,
    base_dex: 20,
    base_int: 20
  },
  1: {
    base_str: 32,
    base_dex: 14,
    base_int: 14,
  },
  2: {
    base_str: 14,
    base_dex: 32,
    base_int: 14,
  },
  3: {
    base_str: 14,
    base_dex: 14,
    base_int: 32,
  },
  4: {
    base_str: 23,
    base_dex: 23,
    base_int: 14,
  },
  5: {
    base_str: 23,
    base_dex: 14,
    base_int: 23,
  },
  6: {
    base_str: 14,
    base_dex: 23,
    base_int: 23,
  },
}


export class BundleStats {
  baseStats: baseStats;

  constructor(selectedClass: number) {
    this.updateClass(selectedClass);
  }

  public updateClass(selectedClass: number) {
    this.baseStats = characterData[selectedClass];
  }

  public willUpdate(mod: string) {

  }

  private calcStats(data: any) {
    const strength = ['s_ts', 's_tsai', 's_tsad'];
    const intelligence = ['s_ti', 's_tsai', 's_tdai'];
    const dexterity = ['s_td', 's_tdai', 's_tsad'];
  }
}
