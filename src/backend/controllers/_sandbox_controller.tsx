import { Singleton } from 'one-atom';

@Singleton()
export class SandboxController {
  public debug = false;

  constructor() {
    // Empty
  }
}
