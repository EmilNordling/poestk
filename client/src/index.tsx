import ReactDOM from 'react-dom';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'mobx-react';
import App from './components/App';
import stores from './stores';

const render = (Component: any) => {
  ReactDOM.render(
    <Provider {...stores}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('app')
  )
};

render(App);

// Reload react hot loader
if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App)
  })
};

// Install Service Worker
if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line global-require
  require('offline-plugin/runtime').install()
};
