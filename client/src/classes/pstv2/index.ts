import Axios from 'axios';
import Graph from './parser/Graph';
import View from './render/View';

export interface Options {
  startClass: number;
}

export interface PassiveNodeData {
  id: number;
  icon?: string;
  ks?: boolean;
  not?: boolean;
  dn?: string;
  m?: boolean;
  isJewelSocket?: boolean;
  isMultipleChoice?: boolean;
  isMultipleChoiceOption?: boolean;
  passivePointsGranted?: number;
  da?: number;
  spc?: Array<any>;
  sd?: {
    [modifier: string]: number;
  };
  g?: number;
  o?: number;
  oidx?: number;
  sa?: number;
  ia?: number;
  out?: number;
  reminderText?: string;
  ascendancyName?: string;
  isAscendancyStart?: boolean;
  isAscendancy?: boolean;
  flavourText?: boolean;
}

export interface NodeData {
  groups: { [key: string]: any };
  nodes: PassiveNodeData[];
}

export const image = new Image();
image.src = '/treeData/skills-2.jpg';

export default async function load(options?: Options) {
  try {
    const { data } = await Axios.get<NodeData>('/treeData/nodeData.json');

    Graph.popularize(data);

    View.init();
  } catch (error) {
    console.log(error);
  }
}

load();
