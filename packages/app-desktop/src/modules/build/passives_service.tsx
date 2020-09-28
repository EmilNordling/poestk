import { Service, Instantiation } from '@kira/instantiation';

@Service()
export class PassivesService {
  public static readonly ctor_name = Symbol();
  public static readonly ctor_lifetime = Instantiation.Lifetimes.Transient;

  constructor() {
    // Empty
  }
}
