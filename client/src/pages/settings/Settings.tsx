import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { AuthStore } from '../../stores';
import { Link, Route, Switch } from 'react-router-dom';
import { colors } from '../../constants';
import Account from './subPages/Account';
import { Application } from './subPages/index';
import NotFound from '../notFound/index';

interface Settings {
  authStore?: AuthStore;
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  background: ${colors.main_content_dark};
  background-image: linear-gradient(90deg, #1b1d23 20%, #282b35);
  overflow-y: auto;
  overflow-x: hidden;
`;

const GrowWrapper = styled.div`
  height: 100%;
  padding-top: 40px;
`;

const Content = styled.div`
  width: 640px;
  min-height: 100%;
  padding: 40px;
  border: 1px solid #16171b;
  border-bottom: 0;
  background: #313440;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Nav = styled.nav`
  position: sticky;
  top: 40px;
  min-width: 150px;
  box-sizing: content-box;
  margin-right: 64px;
  align-self: flex-start;
`;

const Seperator = styled.div`
  margin: 15px 0;
  border-bottom: 1px solid ${colors.main_color_dimmed};
`;

const Logout = styled.div`
  display: block;
  padding: 6px 12px;
  margin-top: 4px;
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

const LinkButton = styled(Link)`
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
    const { match } = this.props;

    if (this.props.authStore!.currentUser === null) return null;

    return (
      <Container>
        <Nav>
          <LinkButton className='active' to={`${match.url}`}>Account</LinkButton>
          <LinkButton to={`${match.url}/application`}>Application</LinkButton>
          <Seperator />
          <Logout onClick={this.logout}>Log Out</Logout>
        </Nav>

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
