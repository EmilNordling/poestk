import { createApplicationState, Singleton } from 'one-atom';

interface MenuSeparatorSpec {
  key: string;
}
export class MenuSeparator {
  public readonly key: string;
  constructor({ key }: MenuSeparatorSpec) {
    this.key = key;
  }
}

interface MenuItemSpec {
  label: string;
  key: string;
  click?(): void;
  subMenu?: (MenuItem | MenuSeparator)[];
}

export class MenuItem {
  public readonly label: string;
  public readonly key: string;
  public readonly subMenu: (MenuItem | MenuSeparator)[] | null;
  private readonly proxyClick: (() => void) | null;

  constructor({ key, label, click, subMenu }: MenuItemSpec) {
    this.label = label;
    this.key = key;
    this.subMenu = subMenu ?? null;
    this.proxyClick = click ?? null;

    this.click.bind(this);
  }

  public click(): void {
    if (this.proxyClick) this.proxyClick();
  }
}

type Menu = {
  builder: (MenuItem | MenuSeparator)[];
  attachTo: string;
};

type State = {
  menu: Menu | null;
};

@Singleton()
export class MenuController {
  public readonly state = createApplicationState<State>({
    menu: null,
  });

  constructor() {
    // Empty
  }

  public isOpen(): boolean {
    const state = this.state.read();

    return !!state.menu;
  }

  public setMenu(menu: Menu): void {
    this.state.write(() => ({
      menu,
    }));
  }

  public clearMenu(): void {
    this.state.write(() => ({
      menu: null,
    }));
  }
}
