import React from 'react'
import styled from 'styled-components'
import { colors } from '../../constants'

const Bar = styled.header`
  display: flex;
  justify-content: space-between;
  height: 30px;
  background: ${colors.desktop_bar_backdrop};
  z-index: 1;
  box-shadow: 1px 0px 3px rgba(0, 0, 0, 0.2);
`

const Tabs = styled.div`
  display: flex;
`

const Tab = styled.div`
  display: flex;
  background: ${colors.desktop_bar_foreground};
  padding: 0 20px;
  align-items: center;
  border-right: 2px solid ${colors.gray202};
`

const Options = styled.div`

`

export default () => (
  <Bar>
    <Tabs>
      <Tab>tab 1</Tab>
    </Tabs>
    <Options />
  </Bar>
)
