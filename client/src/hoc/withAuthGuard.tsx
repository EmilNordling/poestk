import React from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

function withAuthGuard(Component: any) {
  const AuthenticatedComponent = inject('authStore')(observer((props) => {
    if (!props.authStore.authenticated) {
      return <Redirect to={`/signin`} />;
    }

    return <Component />;
  }));

  return AuthenticatedComponent;
}

export default withAuthGuard;
