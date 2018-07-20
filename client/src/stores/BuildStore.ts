import { observable, computed, action } from 'mobx';
import { changeClass } from '../classes/pst/publicAPI';
import getNewCharacter, { Character, DisplayCharacter } from '../classes/calc/virutalCharacter';
import { renderer, loader } from '../classes/pst';
import { Characters } from '../classes/pst/characters';

type builds = {
  [build: string]: Character;
};

export default class BuildStore {
  @observable public loading = true;
  @observable public currentTab = 0;

  @observable public activeBuild: DisplayCharacter;
  public builds: builds = {};

  @action
  public async firstLoad(mountIn: HTMLElement) {
    if (mountIn === null) return;

    await loader.start();

    this.newCharacter(Characters.scion, false);

    this.loading = false;
    renderer.mountCanvas(mountIn);
  }

  @action
  public change = (value: string, model: string) => {
    switch (model) {
      case 'selectedClass':
        this.newCharacter(parseInt(value, 10));

        console.log(this.activeBuild)
        break;
      case 'selectedAscendancy':
        console.log(value);
        break;
      case 'bandit':
        console.log(value);
        break;
    }
  }

  private newCharacter(character: Characters, destructive = true) {
    changeClass(character, destructive, destructive);
    this.builds[this.currentTab] = getNewCharacter(character);
    this.activeBuild = this.builds[this.currentTab].getObservable();
  }
}
