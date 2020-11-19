import { Singleton } from '@kira/instantiation';
import { Lifetimes } from '@kira/instantiation/lib/token';
import { Item } from './item';

@Singleton()
export class ItemsService {
  public static readonly ctor_name = Symbol();
  public static readonly ctor_lifetime = Lifetimes.Transient;
  public readonly equipped: Item[] = [];

  constructor() {
    // Empty
  }
}
