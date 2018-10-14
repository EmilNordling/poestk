import Axios from 'axios';
import Graph from './parser/Graph';
import View from './render/View';
import State from './State';

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

function loadAssets(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = error => reject(error);
    image.src = src;
  });
}

export default async function load(options?: Options) {
  if (State.isLoaded) return;

  try {
    const { data } = await Axios.get<NodeData>('/treeData/nodeData.json');

    State.assets = {
      skills: await loadAssets('/treeData/skills-2.jpg'),
    };

    Graph.popularize(data);

    View.init();

    State.isLoaded = true;
  } catch (error) {
    console.log(error);
  }
}
