import React, { Suspense, lazy } from 'react';
import { Routes as RRoutes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { CharacterSkeleton } from './_character.component/character_skeleton.component';
import { SandboxSkeleton } from './_sandbox.component/sandbox_skeleton.component';

export { CharacterSkeleton, SandboxSkeleton };

export namespace Routes {
  function lazyLoadCharacter(): JSX.Element {
    const LazyComponent = lazy(() => import('./_character.component/mod').then((module) => ({ default: module['Character']['h'] })));

    return (
      <Suspense fallback={<CharacterSkeleton.h />}>
        <LazyComponent />
      </Suspense>
    );
  }

  function lazyLoadHome(): JSX.Element {
    const LazyComponent = lazy(() => import('./_home.component/mod').then((module) => ({ default: module['Home']['h'] })));

    return (
      <Suspense fallback={null}>
        <LazyComponent />
      </Suspense>
    );
  }

  function lazyLoadSandbox(): JSX.Element {
    const LazyComponent = lazy(() => import('./_sandbox.component/mod').then((module) => ({ default: module['Sandbox']['h'] })));

    return (
      <Suspense fallback={<SandboxSkeleton.h />}>
        <LazyComponent />
      </Suspense>
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
