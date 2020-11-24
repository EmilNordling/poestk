import { FlowState, newApplicationState, Singleton } from 'one-atom';

interface MenuItem {
  label: string;
  key: string;
  click?(): void;
  subMenu?: MenuItem[];
}

type Menu = {
  builder: MenuItem[];
  attachTo: string;
};

type State = {
  menu: Menu | null;
};

@Singleton()
export class MenuService {
  public readonly state = newApplicationState<State>({
    menu: null,
  });

  constructor() {
    this.state.inFlow(FlowState.ACCESSIBLE);
  }

  public isOpen(): boolean {
    const [state] = this.state.read();

    return !!state.menu;
  }

  public setMenu(menu: Menu): void {
    this.state.mutate(() => {
      return {
        menu,
      };
    });
  }

  public clearMenu(): void {
    this.state.mutate(() => {
      return {
        menu: null,
      };
    });
  }
}
