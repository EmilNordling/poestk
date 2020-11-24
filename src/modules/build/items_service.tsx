import { Singleton } from 'one-atom';
import { Item } from './item';

@Singleton()
export class ItemsService {
  public readonly equipped: Item[] = [];

  constructor() {
    // Empty
  }
}
