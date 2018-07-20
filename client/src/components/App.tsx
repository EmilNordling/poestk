import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { AuthStore, GuiStore } from '../stores';
import routes from '../routes';
import { colors } from '../constants';
import { H } from '../common/text';
import withGlobalStyles from '../hoc/withGlobalStyles';

const SWUpdate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
  background: ${colors.main_color_highlight};
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
`;

@inject('authStore', 'guiStore')
@observer
class App extends Component<{ authStore: AuthStore, guiStore: GuiStore }> {
  public componentDidMount() {
    this.props.authStore.pullUser();
  }

  private handleSWUpdateClick() {
    window.location.reload();
  }

  render() {
    const { authenticated, currentUser } = this.props.authStore;

    return (
      <Router>
        <Fragment>


          {this.props.guiStore.showSWUpdated &&
            <SWUpdate onClick={this.handleSWUpdateClick}>
              <H size={3}>There's a new version available. Click here to update</H>
            </SWUpdate>
          }

          <Switch>
            {routes.map((pages, index) => <Route key={index} {...pages} />)}
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default withGlobalStyles(App);
