import React, { Component } from 'react'
import styled from 'styled-components'
import { NavLink as RouterLink, withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { colors } from '../constants'
import Icon from '../common/icon';

const NavStyle = styled.nav`
  display: flex;
  height: 100%;
`

const LinkIcon = styled(RouterLink)`
  display: flex;
  align-items: center;
  padding: 0 4px;
  font-size: 1.6rem;

  &:hover {
    background: ${colors.main_backdrop};
  }
`

const LinkText = styled(RouterLink)`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 500;
  overflow: hidden;

  &:hover {
    &::after {
      transform: translateY(-2px);
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background: ${colors.blue400};
    transition: transform 100ms ease;
    will-change: transform;
  }
`

const Nav = (props: any) => {
    console.log(props)

    const { commonStore, guiStore, location } = props;

    return (
      <NavStyle>
        {commonStore.token ?
          <LinkIcon to="/settings"><Icon name='gearFilled' /></LinkIcon>
          :
          <LinkText to="/signin">sign in</LinkText>
        }
      </NavStyle>
    )
}

export default withRouter(inject('guiStore', 'commonStore')(observer(Nav)))
