import { Service, Instantiation } from '@kira/instantiation';
import { ItemsService } from './items_service';
import { PassivesService } from './passives_service';

@Service()
export class VirtualCharacterService {
  public static readonly ctor_name = Symbol();
  public static readonly ctor_lifetime = Instantiation.Lifetimes.Transient;

  constructor(public readonly passives: PassivesService, public readonly items: ItemsService) {
    // Empty
  }
}
