import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { colors } from '../constants'
import Pst from '../components/Pst'
import Content from '../components/Content'
import CharacterInfo from '../components/CharacterInfo'

const GlobalContainer = styled.div`
  display: flex;
  position: relative;
  flex: 1;
  align-items: stretch;
  justify-content: space-between;
`

const Main = styled.main`
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
`

const Bar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  display: flex;
  background: ${colors.gray400};
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #00000085;
`

@inject('guiState')
@observer
class Home extends Component {
  toggleMenu = () => {
    this.props.guiState.characterInfoOpen = !this.props.guiState.characterInfoOpen
  }

  render() {
    return (
      <Main>
        <GlobalContainer>
          <Content>
            <Pst />
          </Content>
          <Bar onClick={this.toggleMenu} />

          <CharacterInfo />
        </GlobalContainer>
      </Main>
    )
  }
}

export default Home
