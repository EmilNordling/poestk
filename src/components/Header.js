import React from 'react'
import styled from 'styled-components'
import Nav from './Nav'
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

const Logo = styled.div`
  font-size: 2rem;
`

export default () => (
  <Header>
    <Logo />
    <Nav />
  </Header>
)
