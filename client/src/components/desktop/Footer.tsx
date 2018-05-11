import React from 'react'
import styled from 'styled-components'
import { colors } from '../../constants'

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 18px;
  background: ${colors.desktop_bar_backdrop};
  z-index: 1;
  padding-right: 10px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);

  & p {
    font-size: 1rem;
    margin-bottom: 2px;
  }
`

export default () => (
  <Footer>
    <div>
      <p>version: 0.4.0</p>
    </div>
  </Footer>
)
