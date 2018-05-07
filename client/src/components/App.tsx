import React, { Component } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { colors } from '../constants'
import routes from '../routes'
import stores from '../stores'
import WrapGlobalStyles from './WrapGlobalStyles'
import Nav from './Nav'
import Header from './Header'
import BottomBar from './BottomBar'
import Overlay from './Overlay'
import CharacterInfo from './CharacterInfo'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const GlobalContainer = styled.div`
  flex: 1;
  position: relative;
  background-color: ${colors.gray202};
`

class App extends Component {
  render () {
    return (
      <Provider {...stores}>
        <Router>
          <Container>
            <Header />
            <GlobalContainer>
              <Switch>
                {routes.map(props => <Route {...props} />)}
              </Switch>
            </GlobalContainer>
            <BottomBar />
            <Overlay />
            <CharacterInfo />
          </Container>
        </Router>
      </Provider>
    )
  }
}

export default WrapGlobalStyles(App)
