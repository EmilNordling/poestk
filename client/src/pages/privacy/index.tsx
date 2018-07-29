import React from 'react';
import Loadable from 'react-loadable';
import Loading from '../../components/Loading';

const LoadableComponent = Loadable({
  loader: () => import('./Privacy'),
  loading: Loading,
});

const LoadableSettings: React.SFC = () => {
  return (
    <LoadableComponent />
  );
};

export default LoadableSettings;
