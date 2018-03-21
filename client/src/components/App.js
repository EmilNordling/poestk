import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom/es'
import { Provider } from 'mobx-react'
import routes from '../routes'
import WrapGlobalStyles from './WrapGlobalStyles'
import stores from '../stores'
import windowListners from '../decorators/windowListners'

@windowListners
class App extends Component {
  componentDidMount() {
    this.createEvents()
  }

  render() {
    return (
      <Provider {...stores}>
        <Router>
          <Switch>
            {routes.map(props => <Route {...props} />)}
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default WrapGlobalStyles(App)
