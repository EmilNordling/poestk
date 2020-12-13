import { Transient } from 'one-atom';
import { PassivesTreeCoreService } from './_skill_tree_core_service';
import { SkillTreeDataService } from './_skill_tree_data_service';

@Transient()
export class SkillTree {
  constructor(
    private readonly passivesTreeCoreService: PassivesTreeCoreService,
    private readonly skillTreeDataService: SkillTreeDataService,
  ) {
    // Empty
  }
}
