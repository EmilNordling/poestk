import { new_application_state } from '@kira/application-state';
import { Service, Instantiation } from '@kira/instantiation';
import { Lifetimes } from '@kira/instantiation/lib/token';
import { InputOutput } from './input_output';
import { Nodes } from './nodes';

type PassiveState = {
  passives: any;
};

// EXTRACT
// interface Spec {
//   name: string;
//   group: string;
//   icon: string;
//   in: string[];
//   orbit: number;
//   orbitIndex: number;
//   out: string[];
//   skill: number;
//   stats: string[];
// }

// class Node {
//   public readonly name: string;
//   public readonly group: string;
//   public readonly icon: string;
//   public readonly in: string[];
//   public readonly orbit: number;
//   public readonly orbitIndex: number;
//   public readonly out: string[];
//   public readonly skill: number;
//   public readonly stats: string[];

//   constructor(spec: Spec) {
//     this.name = spec.name;
//     this.group = spec.group;
//     this.icon = spec.icon;
//     this.in = spec.in;
//     this.orbit = spec.orbit;
//     this.orbitIndex = spec.orbitIndex;
//     this.out = spec.out;
//     this.skill = spec.skill;
//     this.stats = spec.stats;
//   }
// }

// EXTRACT
// class NodeService {
//   public readonly nodes = new Map<string, Node>();
// }

@Singleton()
export class PassivesTreeService {
  public static readonly ctor_name = Symbol();
  public static readonly ctor_lifetime = Lifetimes.Transient;
  public readonly state = new_application_state<PassiveState>({
    passives: {},
  });

  constructor(public readonly io: InputOutput, public readonly passives: Nodes) {
    (async () => {
      const data = await (await fetch('json_data/3.12.0-pre/skillTree.json')).json();

      console.log(data);
    })();

    // const e = new NodeService();

    // for (const key in tree.nodes) {
    //   if (Object.prototype.hasOwnProperty.call(tree.nodes, key)) {
    //     const element = tree.nodes[key];

    //     e.nodes.set(
    //       key,
    //       new Node({
    //         group: element.group,
    //         icon: element.icon,
    //         in: element.in,
    //         name: element.name,
    //         orbit: element.orbit,
    //         orbitIndex: element.orbitIndex,
    //         out: element.out,
    //         skill: element.skill,
    //         stats: element.stats,
    //       }),
    //     );
    //   }
    // }
  }
}
