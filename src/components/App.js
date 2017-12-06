import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom/es'
import styled from 'styled-components'
import routes from '../routes'
import InjectGlobalStyles from './InjectGlobalStyles'
import Header from './Header'
import LeftSideBar from './LeftSideBar'
import RightSideBar from './RightSideBar'
import Content from './Content'

const GlobalContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  align-items: stretch;
  justify-content: space-between;
`

const Main = styled.main`
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
`

const App = () => (
  <Router>
    <Main>
      <InjectGlobalStyles />
      <Header />
      <GlobalContainer>
        <LeftSideBar />
        <Content>
          <Switch>
            {routes.map(props => <Route {...props} />)}
          </Switch>
        </Content>
        <RightSideBar />
      </GlobalContainer>
    </Main>
  </Router>
)

// <Main>
// <LeftSideBar />
// <Switch>
//   {routes.map(props => <Route {...props} />)}
// </Switch>
// </Main>

export default App
