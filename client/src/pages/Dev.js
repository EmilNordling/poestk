import React, { Component } from 'react'
import styled from 'styled-components'
import { computed } from 'mobx'
import { observer, inject } from 'mobx-react'

const Main = styled.div`
  height: 100vh;
`

const Layout = styled.section`
  display: flex;
  flex-direction: column;
  background: red;
`

const Header = styled.header`
  display: flex;
  height: 40px;
  padding: 0 20px;
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
        <Layout>qwe</Layout>
      </Main>
    )
  }
}

export default Home
