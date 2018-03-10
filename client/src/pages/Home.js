import styled from 'styled-components'
import React from 'react'
import Pst from '../components/Pst'
import Content from '../components/Content'

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

const Home = () => (
  <Main>
    <GlobalContainer>
      <Content>
        <Pst />
      </Content>
    </GlobalContainer>
  </Main>
)

export default Home
