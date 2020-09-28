import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { ResetCss } from '@kira/ui';
import { Tree } from './components/tree.component';

function render() {
  ReactDOM.render(
    <Fragment>
      <ResetCss.h />
      <Tree.h />
    </Fragment>,
    document.getElementById('root'),
  );
}

render();
