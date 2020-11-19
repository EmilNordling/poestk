import { Singleton } from '@kira/instantiation';
import { Lifetimes } from '@kira/instantiation/lib/token';

@Singleton()
export class InputOutput {
  public static readonly ctor_name = Symbol();
  public static readonly ctor_lifetime = Lifetimes.Transient;

  constructor() {
    // Empty
  }
}
