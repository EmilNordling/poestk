import { Singleton } from 'one-atom';

@Singleton()
export class ApplicationService {
  public debug = false;

  constructor() {
    // Empty
  }

  public boot(): void {
    console.log('hehe');
  }
}
