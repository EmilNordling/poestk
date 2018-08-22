import ReactDOM from 'react-dom';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'mobx-react';
import App from './components/App';
import stores from './stores';
import setTheme from './theme';
// import './classes/pstWebGL/render/test';
// import './classes/pstWebGL/render/sprite';
// import './classes/pstWebGL';

setTheme();

const render = (Component: any) => {
  ReactDOM.render(
    <Provider {...stores}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('app'),
  );
};

render(App);

// Reload react hot loader
if (module.hot) {
  module.hot.accept('./components/App', () => render(App));
}

// Install Service Worker
if (process.env.NODE_ENV === 'production') {
  const runtime = require('offline-plugin/runtime');

  runtime.install({
    onUpdating: () => {
      console.log('SW:', 'onUpdating');
    },
    onUpdateReady: () => {
      console.log('SW:', 'onUpdateReady');
      runtime.applyUpdate();
    },
    onUpdated: () => {
      console.log('SW:', 'onUpdated');

      stores.guiStore.showSWUpdated = true;
    },
    onUpdateFailed: () => {
      console.log('SW:', 'onUpdateFailed');
    },
  });
}
