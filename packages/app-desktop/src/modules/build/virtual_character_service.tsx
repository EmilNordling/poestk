import { Singleton } from '@kira/instantiation';
import { Lifetimes } from '@kira/instantiation/lib/token';
import { ItemsService } from './items_service';
import { PassivesService } from './passives_service';

@Singleton()
export class VirtualCharacterService {
  public static readonly ctor_name = Symbol();
  public static readonly ctor_lifetime = Lifetimes.Transient;

  constructor(public readonly passives: PassivesService, public readonly items: ItemsService) {
    // Empty
  }
}
