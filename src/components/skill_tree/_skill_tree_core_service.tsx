import { Scoped } from 'one-atom';
import { SkillTreeDataService } from './_skill_tree_data_service';

@Scoped()
export class PassivesTreeCoreService {
  constructor(public readonly skillTreeDataService: SkillTreeDataService) {
    // Empty
  }
}
