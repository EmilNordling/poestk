import React, { Component } from 'react';
import Page from '../../components/Page';
import { H } from '../../common/text';

class NotFound extends Component {
  render() {
    return (
      <Page showHeader={false}>
        <H size={1}>404</H>
      </Page>
    );
  }
}

export default NotFound;
