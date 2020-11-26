import { ResetCss } from 'one-atom';
import { Fragment } from 'react';
import { Routes } from '../routes/mod';
import { Menu } from './menu.component';

const App: FC = () => {
  return (
    <Fragment>
      <ResetCss.h />
      <Menu.h />
      <Routes.h />
    </Fragment>
  );
};

export default App;
