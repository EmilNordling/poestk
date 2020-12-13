import { Transient } from 'one-atom';
import { SkillTree } from '../skill_tree/mod';

@Transient()
export class PoestkBuild {
  constructor(private readonly skillTree: SkillTree) {
    // Empty
  }
}
