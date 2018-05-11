import React, { Component } from 'react'
import styled from 'styled-components'
import { colors } from '../../constants'

const Container = styled.div`
  width: 300px;
  height: 100%;
  display: flex;
  background: ${colors.gray400};
  z-index: 1;
  flex-direction: column;
  box-shadow: 1px 0px 3px rgba(0,0,0,0.2);
`

const Header = styled.header`
  display: flex;
  height: 30px;
  background: ${colors.desktop_bar_foreground};
  width: 100%;
`

const Content = styled.header`
  display: flex;
  flex: 1;
`

const Footer = styled.footer`
  height: 18px;
  background: ${colors.desktop_bar_foreground};
  width: 100%;
`

const Left = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  padding: 0 10px;
`

const Icon = styled.div`
  width: 18px;
  height: 18px;
  background: red;
`

class DesktopStats extends Component {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <Container>
        <Header />
        <Content />
        <Footer>
          <Left>
            <Icon />
            <Icon />
          </Left>
        </Footer>
      </Container>
    )
  }
}

export default DesktopStats
