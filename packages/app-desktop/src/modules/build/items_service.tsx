import { Service, Instantiation } from '@kira/instantiation';
import { Item } from './item';

@Service()
export class ItemsService {
  public static readonly ctor_name = Symbol();
  public static readonly ctor_lifetime = Instantiation.Lifetimes.Transient;
  public readonly equipped: Item[] = [];

  constructor() {
    // Empty
  }
}
