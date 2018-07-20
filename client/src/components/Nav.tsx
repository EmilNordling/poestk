import React from 'react';
import styled from 'styled-components';
import { NavLink as RouterLink, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { AuthStore } from '../stores';
import { colors } from '../constants';
import Icon from '../common/icon';

const NavStyle = styled.nav`
  display: flex;
  height: 50px;
  padding: 0 20px;
  z-index: 1;
  background: ${colors.main_background_light};
  color: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

const LinkIcon = styled(RouterLink)`
  display: flex;
  align-items: center;
  padding: 0 4px;
  font-size: 1.6rem;

  &:hover {
    background: ${colors.main_color_highlight};
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
    background: ${colors.main_color_highlight};
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

  return (
    <NavStyle>
      {authStore!.token ?
        <LinkIcon to='/settings'><Icon name='gearFilled' /></LinkIcon>
        :
        <LinkText to='/signin'>sign in</LinkText>
      }
    </NavStyle>
  );
};

export default withRouter(inject('authStore')(observer(Nav)));
