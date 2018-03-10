import React, { Component } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom/es'
import { Provider } from 'mobx-react'
import routes from '../routes'
import InjectGlobalStyles from './InjectGlobalStyles'
import stores from '../stores'
import windowListners from '../decorators/windowListners'
import { colors } from '../constants'

const Bar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: ${colors.gray400};
`

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
            <Bar />
          </Main>
        </Router>
      </Provider>
    )
  }
}

export default InjectGlobalStyles(App)
