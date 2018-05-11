import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { colors } from '../constants';
import routes from '../routes';
import stores from '../stores';
import WrapGlobalStyles from './WrapGlobalStyles';
import Overlay from './Overlay';
import CharacterInfo from './CharacterInfo';
import HoverNode from './HoverNode';
import { isMobile } from '../utils/isMobile';
import { GlobalContainer, Container } from './Containers';

import TopBar from './mobile/TopBar';
import BottomBar from './mobile/BottomBar';

class App extends Component {
  render () {
    return (
      <Provider {...stores}>
        <Router>
          <Container>
            { isMobile && <TopBar /> }
            { isMobile && <BottomBar /> }

            <Switch>
              {routes.map(props => <Route {...props} />)}
            </Switch>

            <HoverNode />
            <Overlay />
            <CharacterInfo />
          </Container>
        </Router>
      </Provider>
    )
  }
}

export default WrapGlobalStyles(App)
