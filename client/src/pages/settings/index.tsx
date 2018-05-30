import React, { Component } from 'react';
import styled from 'styled-components';
import { FieldsetItem, Fieldset, Form, Button } from '../../common/field';
import { inject, observer } from 'mobx-react';
import { colors } from '../../constants';
import { List, ListItem, Border } from '../../common/list';
import { withRouter } from 'react-router-dom';

const Content = styled.div`
  display: flex;
  flex: 1;
`

const Settings = styled.div`
  width: 580px;
  background: ${colors.main_content};
`

const Header = styled.div`
  height: 30px;

`

const Inner = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  padding: 50px 20px 0 0;
`

const Info = styled.div`
  flex: 1;
`

@inject('authStore')
@observer
class Register extends Component {
  logout = () => this.props.authStore.logout();

  render() {
    const { values, errors, inProgress } = this.props.authStore;

    return (
      <Content>
        <Settings>
          <Header />
          <Inner>
            <List>
              <ListItem icon='xd'>profile</ListItem>
              <Border />
              <ListItem icon='xd'>qwe</ListItem>
              <Border />
              <ListItem icon='xd' onClick={this.logout}>logout</ListItem>
            </List>
          </Inner>
        </Settings>
        <Info />
      </Content>
    )
  }
}

export default Register
