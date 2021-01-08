import { Singleton } from 'one-atom';

@Singleton()
export class SkillTreeDataService {
  constructor() {
    // Empty
  }

  public async load(): Promise<void> {
    const data = await (await fetch('json_data/3.12.0-pre/skillTree.json')).json();

    console.log(data);
  }
}
