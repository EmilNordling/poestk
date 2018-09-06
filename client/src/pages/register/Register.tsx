import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { AuthStore } from '../../stores';
import { Form, FieldsetItem, Button } from '../../common/fieldAlt';
import { H } from '../../common/text';
import NavRow from '../../components/NavRow';
import formGroup from '../../utils/formGroup';
import { RegisterState } from './RegisterMain';
import { colors } from '../../constants';
import Icon from '../../common/icon';
import { Helmet } from 'react-helmet';

interface Props {
  authStore?: AuthStore;
  onSubmit: (newState: RegisterState) => void;
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
class Register extends Component<Props> {
  private form = formGroup({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  private handleUsernameChange = (event: React.FormEvent<HTMLInputElement>) => this.form.push('username', event.currentTarget.value);
  private handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => this.form.push('email', event.currentTarget.value);
  private handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => this.form.push('password', event.currentTarget.value);
  private handlepasswordConfirmChange = (event: React.FormEvent<HTMLInputElement>) => this.form.push('passwordConfirm', event.currentTarget.value);
  private handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.authStore!.register(this.form.currentState(), () => {
      this.props.onSubmit(RegisterState.addCharacters);
    });
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
            <Form onSubmit={this.handleSubmitForm}>
            <H size={2} margin={20}>Create an account!</H>
            <FieldsetItem
              label='username'
              type='text'
              value={this.form.pull('username')}
              onChange={this.handleUsernameChange}
            />
            <FieldsetItem
              label='email'
              type='Email'
              value={this.form.pull('email')}
              onChange={this.handleEmailChange}
            />
            <FieldsetItem
              label='password'
              type='Password'
              value={this.form.pull('password')}
              onChange={this.handlePasswordChange}
            />
            <FieldsetItem
              label='repeat password'
              type='Password'
              value={this.form.pull('passwordConfirm')}
              onChange={this.handlepasswordConfirmChange}
            />

            <Button type='submit' disabled={loading}>
              create
            </Button>

            <NavRow
              links={[
                {
                  linkTo: '/privacy',
                  value: 'privacy policy',
                },
                {
                  linkTo: '/',
                  value: 'home',
                },
                {
                  linkTo: '/signin',
                  value: 'sign in',
                },
              ]}
            />
          </Form>
          </Content>
        </Background>
      </Fragment>
    );
  }
}

export default Register;
