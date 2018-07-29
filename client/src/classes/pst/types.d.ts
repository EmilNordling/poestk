interface PassiveNode {
  id: number,
  icon?: string,
  ks?: boolean,
  not?: boolean,
  dn?: string,
  m?: boolean,
  isJewelSocket?: boolean,
  isMultipleChoice?: boolean,
  isMultipleChoiceOption?: boolean,
  passivePointsGranted?: number,
  da?: number,
  spc?: Array<any>,
  sd?: {
    [modifier: string]: number,
  },
  g?: number,
  o?: number,
  oidx?: number,
  sa?: number,
  ia?: number,
  out?: number,
  reminderText?: string,
  ascendancyName?: string,
  isAscendancyStart?: boolean,
  isAscendancy?: boolean,
  flavourText?: boolean,
}

declare module '*.json' {
  const value: any;
  export default value;
}
