import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { AuthStore } from '../../stores';
import { NavLink, Route, Switch } from 'react-router-dom';
import { colors } from '../../constants';
import Account from './subPages/Account';
import { Application } from './subPages';
import NotFound from '../notFound';

interface Settings {
  authStore?: AuthStore;
}

const Aside = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  flex: 1 0 200px;
  padding: 40px;
  background: ${colors.main_content_dark};
  background-image: linear-gradient(90deg, #1b1d23 20%, #282b35);
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

const GrowWrapper = styled.div`
  display: flex;
  flex: 1 1 600px;
  background: #313440;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  overflow-x: hidden;
`;

const Content = styled.div`
  max-width: 650px;
  width: 100%;
  padding: 40px;
  border-bottom: 0;
`;

const Nav = styled.nav`
  position: sticky;
  top: 0;
  min-width: 180px;
  box-sizing: content-box;
  align-self: flex-start;
`;

const Logout = styled.div`
  display: block;
  padding: 6px 12px;
  margin-top: 20px;
  font-size: 16px;
  border-radius: 4px;
  background: transparent;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: ${colors.danger};

  &:hover {
    background-color: ${colors.danger_dimmed};
  }
`;

const LinkButton = styled(NavLink)`
  display: block;
  padding: 6px 12px;
  margin-top: 4px;
  font-size: 16px;
  border-radius: 4px;
  background: transparent;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: '#3f3b7b';
    color: #dcdcdc;
  }

  &:first-of-type {
    margin-top: 0;
  }

  &.active {
    background-color: #847aff;
    background-image: linear-gradient(-90deg, rgba(219, 86, 255, 0.62) -20%, rgba(108, 96, 255, 0.52));
  }
`;

@inject('authStore')
@observer
class Setting extends Component<Settings> {
  private logout = () => this.props.authStore!.logout();

  render() {
    const { match, location } = this.props;

    console.log(this.props)

    if (this.props.authStore!.currentUser === null) return null;

    return (
      <Container>
        <Aside>
          <Nav>
            <LinkButton exact activeClassName='active' to={`${match.url}`}>Account</LinkButton>
            <LinkButton exact activeClassName='active' to={`${match.url}/application`}>Application</LinkButton>
            <Logout onClick={this.logout}>Log Out</Logout>
          </Nav>
        </Aside>

        <GrowWrapper>
          <Content>
            <Switch>
              <Route path={`${match.url}`} exact={true} component={Account} />
              <Route path={`${match.url}/application`} exact={true} component={Application} />
              <Route component={NotFound} />
            </Switch>
          </Content>
        </GrowWrapper>
      </Container>
    );
  }
}

export default Setting;
