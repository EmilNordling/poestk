import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import Icon from './common/Icon'
import { colors } from '../constants'

const Header = styled.header`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  height: 45px;
  background-color: ${colors.gray};
  border-bottom: 2px solid ${colors.gray300};
`

const Logo = styled(Link)`
  font-size: 2rem;
`

export default () => (
  <Header>
    <Logo to="/">
      <Icon name="logo" />
    </Logo>
    <Nav />
  </Header>
)
