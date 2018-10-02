import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { AuthStore } from '../../stores';
import { NavLink, Route, Switch } from 'react-router-dom';
import { colors } from '../../constants';
import Account from './subPages/Account';
import { Application, Appearance } from './subPages';
import NotFound from '../notFound';
import { H } from '../../common/text/index';

interface Settings {
  authStore?: AuthStore;
}

const Aside = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  padding: 40px;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  padding: 0 24px;
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
  max-width: 960px;
  width: 100%;
  padding: 40px;
  border-right: 1px solid ${colors.borderStrong};
  border-left: 1px solid ${colors.borderStrong};
  background: ${colors.main};
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
  font-size: 1.6rem;
  border-radius: 4px;
  background: transparent;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: ${colors.danger};

  &:hover {
    background-color: ${colors.dangerDimmed};
  }
`;

const StaleLinkButton = styled.div`
  display: block;
  padding: 6px 12px;
  padding-top: 10px;
  margin-top: 10px;
  border-top: 1px solid ${colors.borderLight};
  font-size: 1.6rem;
  background: transparent;
  font-weight: 500;
  color: #797979;
  text-transform: uppercase;
`;

const LinkButton = styled(NavLink)`
  display: block;
  padding: 6px 12px;
  margin-top: 4px;
  margin-bottom: ${props => props.margin || 0}px;
  font-size: 1.6rem;
  /* border-radius: 4px; */
  background: transparent;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: '#3f3b7b';
    color: #dcdcdc;
    color: '#ffffff';
  }

  &:first-of-type {
    margin-top: 0;
  }

  &:last-of-type {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid ${colors.borderLight};
  }

  &.active {
    color: '#ffffff';
    text-decoration: underline;
    /* background-color: #847aff; */
    /* background-image: linear-gradient(-90deg, rgba(219, 86, 255, 0.62) -20%, rgba(108, 96, 255, 0.52)); */
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
            <LinkButton exact activeClassName='active' to={'/'}>Back to poestk</LinkButton>
            <StaleLinkButton size={1} margin={10}>User settings</StaleLinkButton>
            <LinkButton exact activeClassName='active' to={`${match.url}`}>Account & Profile</LinkButton>
            <StaleLinkButton size={1} margin={10}>App settings</StaleLinkButton>
            <LinkButton exact activeClassName='active' to={`${match.url}/appearance`}>appearance</LinkButton>
            <Logout onClick={this.logout}>Log Out</Logout>
          </Nav>
        </Aside>

        <Content>
          <Switch>
            <Route path={`${match.url}`} exact={true} component={Account} />
            <Route path={`${match.url}/application`} exact={true} component={Application} />
            <Route path={`${match.url}/appearance`} exact={true} component={Appearance} />
            <Route component={NotFound} />
          </Switch>
        </Content>
      </Container>
    );
  }
}

{/* <Container>
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
</Container> */}

export default Setting;
