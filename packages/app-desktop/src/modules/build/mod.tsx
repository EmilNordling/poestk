import { Instantiation } from '@kira/instantiation';
import { VirtualCharacterService } from './virtual_character_service';

export namespace Build {
  export function create(): VirtualCharacterService {
    return Instantiation.resolve(VirtualCharacterService);
  }
}
