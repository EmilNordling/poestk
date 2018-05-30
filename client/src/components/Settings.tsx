import React, { Component } from 'react';
import styled from 'styled-components';
import transition from 'styled-transition-group';
import { TransitionGroup } from 'react-transition-group';
import { computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { colors } from '../constants';
import { List, ListItem, Border } from '../common/list';

const duration = 100;

const Container = transition.div.attrs({
  unmountOnExit: true,
  timeout: duration,
})`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: all ${duration}ms ease;
  background: ${colors.main_content};

  &:enter {
    opacity: 0.01;
  }
  &:enter-active {
    opacity: 1;
  }
  &:exit {
    opacity: 1;
  }
  &:exit-active {
    opacity: 0.01;
  }
`

@inject('guiStore', 'authStore')
@observer
class Settings extends Component {
  logout = () => this.props.authStore.logout().then(() => this.props.guiStore.settingsPop = false);

  render() {
    return (
      <TransitionGroup>
        {this.props.guiStore.settingsPop &&
          <Container>
            <List>
              <ListItem icon='xd'>profile</ListItem>
              <Border />
              <ListItem icon='xd'>qwe</ListItem>
              <Border />
              <ListItem icon='xd' onClick={this.logout}>logout</ListItem>
            </List>
          </Container>
        }
      </TransitionGroup>
    )
  }
}

export default Settings
