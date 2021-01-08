import { Suspense, lazy } from 'react';
import { Routes as RRoutes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Skeleton as CharacterSkeleton } from '../routes/character.component/skeleton.component';
import { Skeleton as SandboxSkeleton } from '../routes/sandbox.component/skeleton.component';

// Exports all skeleton views for external SSR
export { CharacterSkeleton, SandboxSkeleton };

interface Props {}

function lazyLoadCharacter(): JSX.Element {
  const LazyComponent = lazy(() => import('../routes/character.component/mod').then((module) => ({ default: module['Character'] })));

  return (
    <Suspense fallback={<CharacterSkeleton />}>
      <LazyComponent />
    </Suspense>
  );
}

function lazyLoadHome(): JSX.Element {
  const LazyComponent = lazy(() => import('../routes/home.component/mod').then((module) => ({ default: module['Home'] })));

  return (
    <Suspense fallback={null}>
      <LazyComponent />
    </Suspense>
  );
}

function lazyLoadSandbox(): JSX.Element {
  const LazyComponent = lazy(() => import('../routes/sandbox.component/mod').then((module) => ({ default: module['Sandbox'] })));

  return (
    <Suspense fallback={<SandboxSkeleton />}>
      <LazyComponent />
    </Suspense>
  );
}

export const Routes: FC<Props> = () => {
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
