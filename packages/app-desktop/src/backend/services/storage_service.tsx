import { Service } from '@kira/instantiation';
import { ApplicationStorage } from '@kira/std';

type LocalDict = {
  auth: any;
};

@Service()
export class StorageService {
  public static readonly ctor_name = Symbol('StorageService');
  public local = new ApplicationStorage<LocalDict>('local', '__stk__');
  public session = new ApplicationStorage('session', '__stk__');

  constructor() {
    // Empty
  }
}
