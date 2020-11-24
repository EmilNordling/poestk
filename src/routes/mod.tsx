import React from 'react';
import { Routes as RRoutes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

export namespace Routes {
  function lazyLoadCharacter(): JSX.Element {
    const LazyComponent = React.lazy(() =>
      import('./_character.component/mod').then((module) => ({ default: module['Character']['h'] })),
    );

    return (
      <React.Suspense fallback={null}>
        <LazyComponent />
      </React.Suspense>
    );
  }

  function lazyLoadHome(): JSX.Element {
    const LazyComponent = React.lazy(() => import('./_home.component/mod').then((module) => ({ default: module['Home']['h'] })));

    return (
      <React.Suspense fallback={null}>
        <LazyComponent />
      </React.Suspense>
    );
  }

  function lazyLoadSandbox(): JSX.Element {
    const LazyComponent = React.lazy(() => import('./_sandbox.component/mod').then((module) => ({ default: module['Sandbox']['h'] })));

    return (
      <React.Suspense fallback={null}>
        <LazyComponent />
      </React.Suspense>
    );
  }

  export const h: FC = function Home() {
    return (
      <BrowserRouter>
        <RRoutes>
          <Route path="*" element={<div>404 main</div>} />
          <Route path="/" element={lazyLoadHome()} />
          <Route path="/c" element={lazyLoadCharacter()} />
          <Route path="/c/:id" element={lazyLoadSandbox()} />
        </RRoutes>
      </BrowserRouter>
    );
  };
}
