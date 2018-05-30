import React from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'

function authGuard(Component: any) {
  const AuthenticatedComponent = inject('commonStore')(observer((props) => {
    if (!props.commonStore.authenticated) {
      return <Redirect to={`/signin`} />
    }

    return <Component />
  }))

  return AuthenticatedComponent
}

export default authGuard
