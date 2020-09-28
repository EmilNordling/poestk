import { Service } from '@kira/instantiation';
import { Build } from '../../modules/build/mod';
import { VirtualCharacterService } from '../../modules/build/virtual_character_service';

@Service()
export class BuildService {
  public static readonly ctor_name = Symbol('BuildService');

  constructor() {
    // Empty
  }

  public create(): VirtualCharacterService {
    return Build.create();
  }
}
