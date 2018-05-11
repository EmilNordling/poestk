import React from 'react'
import styled from 'styled-components'
import { colors } from '../../constants'

const TopBar = styled.header`
  position: absolute;
  top: 5px;
  right: 5px;
  left: 5px;
  display: flex;
  justify-content: space-between;
  height: 40px;
  background: ${colors.gray400};
  z-index: 1;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
`

export default () => (
  <TopBar>
    qwe
  </TopBar>
)
