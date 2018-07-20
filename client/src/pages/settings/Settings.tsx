import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { AuthStore } from '../../stores';
import Page from '../../components/Page';
import { Button } from '../../common/field';
import { H } from '../../common/text';

const Content = styled.div`
  padding-top: 5%;
  text-align: center;
`;

@inject('authStore')
@observer
class Setting extends Component<{ authStore?: AuthStore }> {
  logout = () => this.props.authStore!.logout();

  render() {
    return (
      <Page showHeader={false} title='Settings! 🔧'>
        <Content>
          <H size={2} margin={true}>Settings! 🔧</H>
          <Button onClick={this.logout}>
            Sign out
          </Button>
        </Content>
      </Page>
    );
  }
}

export default Setting;
