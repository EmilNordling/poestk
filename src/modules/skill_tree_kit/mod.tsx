import { Scoped } from 'one-atom';
import { StaticSTParser } from './_static_st_node/mod';

@Scoped()
export class SkillTreeKit {
  constructor(public readonly staticSTParser: StaticSTParser) {
    // Empty
  }
}
