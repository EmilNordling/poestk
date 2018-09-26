import React, { Fragment } from 'react';
import styled from 'styled-components';
import { NavLink as RouterLink, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { AuthStore } from '../stores';
import { colors } from '../constants';
import Icon from '../common/icon';

const NavStyle = styled.nav`
  display: flex;
  height: 100%;
`;

const LinkIcon = styled(RouterLink)`
  display: flex;
  align-items: center;
  padding: 0 4px;
  font-size: 1.6rem;

  &:hover {
    background: ${colors.backdrop};
    color: #ffffff;
  }
`;

const LinkText = styled(RouterLink)`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 500;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    width: 100%;
    height: 3px;
    background: ${colors.highlight};
    background-image: linear-gradient(90deg, rgba(219, 86, 255, 0.62) -20%, rgba(108, 96, 255, 0.52));
    transition: transform 100ms ease;
    will-change: transform;
  }

  &:hover {
    &::after {
      transform: translateY(-3px);
    }
  }
`;

interface NavProps extends RouteComponentProps<any> {
  authStore?: AuthStore;
}

const Nav: React.SFC<NavProps> = (props) => {
  const { authStore, location } = props;

  if (authStore!.token) {
    return (
      <NavStyle>
        <LinkIcon to='/settings' title='settings'><Icon name='gearFilled' /></LinkIcon>
      </NavStyle>
    );
  } else {
    return (
      <NavStyle>
        <LinkText to='/signin'>sign in</LinkText>
      </NavStyle>
    );
  }
};

export default withRouter(inject('authStore')(observer(Nav)));
