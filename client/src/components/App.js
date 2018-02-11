import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom/es'
import { Provider } from 'mobx-react'
import styled from 'styled-components'
import routes from '../routes'
import InjectGlobalStyles from './InjectGlobalStyles'
import Header from './Header'
import BuildInformation from './BuildInformation'
import Content from './Content'
import stores from '../stores'

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
  background: --test;
`

const App = () => (
  <Provider {...stores}>
    <Router>
      <Main>
        <InjectGlobalStyles />
        <GlobalContainer>
          <Content>
            <Switch>
              {routes.map(props => <Route {...props} />)}
            </Switch>
          </Content>
        </GlobalContainer>
      </Main>
    </Router>
  </Provider>
)

export default App
