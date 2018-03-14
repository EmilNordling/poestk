import React, { Component } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom/es'
import { Provider } from 'mobx-react'
import routes from '../routes'
import WrapGlobalStyles from './WrapGlobalStyles'
import stores from '../stores'
import windowListners from '../decorators/windowListners'

const Main = styled.main`

`

@windowListners
class App extends Component {
  componentDidMount() {
    this.createEvents()
  }

  render() {
    return (
      <Provider {...stores}>
        <Router>
          <Main>
            <Switch>
              {routes.map(props => <Route {...props} />)}
            </Switch>
          </Main>
        </Router>
      </Provider>
    )
  }
}

export default WrapGlobalStyles(App)
