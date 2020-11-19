import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { ResetCss } from '@kira/ui';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function lazyLoadSandbox(): JSX.Element {
  const LazyComponent = React.lazy(() =>
    import('./routes/sandbox.component/mod').then((module) => ({ default: module['Sandbox']['h'] })),
  );

  return (
    <React.Suspense fallback={null}>
      <LazyComponent />
    </React.Suspense>
  );
}

function render(): void {
  ReactDOM.render(
    <Fragment>
      <ResetCss.h />
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<div>404 main</div>} />
          <Route path='s/:id' element={lazyLoadSandbox()} />
        </Routes>
      </BrowserRouter>
    </Fragment>,
    document.getElementById('root'),
  );
}

render();
