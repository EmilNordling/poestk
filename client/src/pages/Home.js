import React, { Component } from 'react'
import styled from 'styled-components'
import { computed } from 'mobx'
import { observer, inject } from 'mobx-react'
import { colors, media } from '../constants'
import Pst from '../components/Pst'
import Content from '../components/Content'
import CharacterInfo from '../components/CharacterInfo'
import { Icon, Overlay } from '../common'

const GlobalContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  align-items: stretch;
  justify-content: space-between;
`

const Main = styled.main`
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
`

const Bar = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  left: 5px;
  display: flex;
  justify-content: space-between;
  height: 40px;
  background: ${colors.gray400};

  ${media.small`
    top: 0px;
    left: 0px;
    right: 0px;
  `}
`

const Right = styled.div`
  display: flex;
  height: 100%;
`

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 100%;
  font-size: 2rem;
`

@inject('guiState')
@observer
class Home extends Component {
  @computed get menuState() {
    return this.props.guiState.characterInfoOpen
  }

  toggleMenu = () => {
    this.props.guiState.characterInfoOpen = !this.props.guiState.characterInfoOpen
  }

  closeMenu = () => {
    this.props.guiState.characterInfoOpen = false
  }

  render() {
    return (
      <Main>
        <GlobalContainer>
          <Content>
            <Pst />
          </Content>
          <Bar>
            <Right>
              <Item onClick={this.toggleMenu}>
                <Icon name="burger" />
              </Item>
            </Right>
          </Bar>
          <Overlay />
          <CharacterInfo />
        </GlobalContainer>
      </Main>
    )
  }
}

export default Home
