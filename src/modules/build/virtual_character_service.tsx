import { Singleton } from 'one-atom';
import { ItemsService } from './items_service';
import { PassivesService } from './passives_service';

@Singleton()
export class VirtualCharacterService {
  constructor(public readonly passives: PassivesService, public readonly items: ItemsService) {
    // Empty
  }
}
