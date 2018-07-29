import React, { Fragment } from 'react';
import Helmet, { HelmetProps } from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { AuthStore } from '../stores';

interface PageProps extends HelmetProps {
  authStore?: AuthStore;
}

const Page: React.SFC<PageProps> = (props) => {
  const { authenticated, currentUser } = props.authStore!;
  const { children, ...rest } = props;

  return (
    <Fragment>
      <Helmet {...rest} />
      {children}
    </Fragment>
  );
};

export default inject('authStore')(observer(Page));
