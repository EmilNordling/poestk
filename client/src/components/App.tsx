import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { colors } from '../constants';
import routes from '../routes';
import WrapGlobalStyles from './WrapGlobalStyles';
import Overlay from './Overlay';
import HoverNode from './HoverNode';
import { GlobalContainer, Container } from './Containers';
import Modal from './Modal';
import Settings from './Settings';

const Popouts = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 2;
`

@inject('userStore', 'commonStore')
@observer
class App extends Component {
  componentWillMount() {

  }

  componentDidMount() {
    if (this.props.commonStore.token) {
      this.props.userStore.pullUser();
    }
  }

  render () {
    return (
      <Router>
        <Container>
          <Switch>
            {routes.map(props => <Route {...props} />)}
          </Switch>

          <HoverNode />
          <Overlay />
          <Popouts>
            <Settings />
          </Popouts>
        </Container>
      </Router>
    )
  }
}

export default WrapGlobalStyles(App)
