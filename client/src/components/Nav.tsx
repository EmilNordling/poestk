import React, { Component } from 'react'
import styled from 'styled-components'
import { NavLink as RouterLink, withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { colors } from '../constants'

const NavItem = styled.nav`
  display: flex;
  justify-content: center;
`

const Item = styled.li`
  margin: 0 12px;
  font-size: 1.8rem;
  text-decoration: none;
`

const Link = styled(RouterLink)`
  font-size: 1.4rem;
  font-weight: 500;
`

const Nav = (props: any) => {
    console.log(props)

    const { clientStore, location } = props;

    return (
      <NavItem>
        <Link to="/">home</Link>
        <Link to="/sample">sample</Link>
      </NavItem>
    )
}

export default withRouter(inject('ClientStore')(observer(Nav)))
