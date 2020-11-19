import { Singleton } from '@kira/instantiation';
import { Lifetimes } from '@kira/instantiation/lib/token';
import { Build } from '../../modules/build/mod';
import { VirtualCharacterService } from '../../modules/build/virtual_character_service';

@Singleton()
export class BuildService {
  public static readonly ctor_name = Symbol('BuildService');
  static ctor_lifetime = Lifetimes.Scoped;

  constructor() {
    // Empty
  }

  public create(): VirtualCharacterService {
    return Build.create();
  }
}
