import { Scoped } from 'one-atom';
import { STNode } from './_static_st_nodes';

interface SkillTreeClassAscendancy {
  id: string;
  name: string;
}

interface SkillTreeClass {
  ascendancies: SkillTreeClassAscendancy[];
  base_dex: number;
  base_int: number;
  base_str: number;
  name: string;
}

interface SkillTreeGroup {
  nodes: string[];
  orbits: number[];
  x: number;
  y: number;
}

interface SkillTreeNode {
  icon: string;
  name: string;
  stats: string[];
  skill?: number;
  isNotable: boolean;
  group?: number;
  in?: string[];
  orbit?: number;
  orbitIndex?: number;
  out?: string[];
  recipe?: string[];
  reminderText?: string;
}

interface SkillTreeJson {
  classes: SkillTreeClass[];
  constants: {
    PSSCentreInnerRadius: number;
    characterAttributes: {
      Strength: number;
      Dexterity: number;
      Intelligence: number;
    };
    classes: {
      DexClass: number;
      DexIntClass: number;
      IntClass: number;
      StrClass: number;
      StrDexClass: number;
      StrDexIntClass: number;
      StrIntClass: number;
    };
    orbitRadii: number[];
    skillsPerOrbit: number[];
  };
  groups: Record<string, SkillTreeGroup>;
  imageZoomLevels: number[];
  jewelSlots: number[];
  max_x: number;
  max_y: number;
  min_x: number;
  min_y: number;
  nodes: Record<string, SkillTreeNode>;
}

@Scoped()
export class StaticSTParser {
  private dir = 'json_data';
  private version = '3.12.0-pre';

  constructor() {
    // Empty
  }

  public async retrieveAndParse(): Promise<void> {
    // TODO: replace with an STCacheStrategy
    const data: SkillTreeJson = await (await fetch(`${this.dir}/${this.version}/skillTree.json`)).json();

    const map = new Map<string, STNode>();

    Object.values(data.nodes).forEach((node) => {
      if (node.skill) {
        if (!node.group) {
          console.log(node);
        }

        const id = node.skill.toString();
        map.set(id, new STNode(id));
      } else {
        console.log(node);
      }
    });

    for (const group of Object.values(data.groups)) {
      const groupX = (group.x += -data.min_x);
      const groupY = (group.y += -data.min_y);

      for (const nodeId of group.nodes) {
        const node = map.get(nodeId);
        if (!node) throw new Error(`${nodeId} was not in collection`);
      }
    }
  }
}
