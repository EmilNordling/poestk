import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { AuthStore } from '../../stores';
import { Form, Fieldset, FieldsetItem, Button } from '../../common/fieldAlt';
import { H } from '../../common/text';
import NavRow from '../../components/NavRow';
import formGroup from '../../utils/formGroup';
import { colors } from '../../constants';
import Icon from '../../common/icon';
import { Helmet } from 'react-helmet';
import { History } from 'history';
import { observable } from 'mobx';
import Register from './Register';
import AddCharacters from './AddCharacters';

interface Props {
  authStore?: AuthStore;
  history: History;
}

export enum RegisterState {
  register,
  addCharacters,
}

const Background = styled.div`
  display: flex;
  flex: 1;
  padding: 0 10px;
  background: ${colors.main_content_dark};
  background-image: linear-gradient(90deg, #1b1d23 20%, #282b35);
`;

const SplashBackground = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background: repeat 108% 103% url(/assets/splash.png);
  background-position: center;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  min-height: 1000px;
  z-index: 1;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 40px;
  height: 10rem;
  font-size: 10rem;
`;

@inject('authStore')
@observer
class RegisterMain extends Component<Props> {
  @observable private registerState: RegisterState = RegisterState.register;

  public changeView = (newState: RegisterState) => {
    this.registerState = newState;
  }

  render() {
    const { loading } = this.props.authStore!;

    return (
      <Fragment>
        <Helmet
          title='register'
        />
        <Background>
          <SplashBackground />
          <Content>
            <IconWrapper>
              <Icon name='logo' />
            </IconWrapper>
            {this.registerState === RegisterState.register ?
              <Register onSubmit={this.changeView}/>
            :
              <AddCharacters />
            }
          </Content>
        </Background>
      </Fragment>
    );
  }
}

export default RegisterMain;
