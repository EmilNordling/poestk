import React from 'react';
import Loadable from 'react-loadable';
import Loading from '../../components/Loading';

const LoadableComponent = Loadable({
  loader: () => import('./Register'),
  loading: Loading,
});

const LoadableSettings: React.SFC = (props: any) => {
  return (
    <LoadableComponent {...props} />
  );
};

export default LoadableSettings;
