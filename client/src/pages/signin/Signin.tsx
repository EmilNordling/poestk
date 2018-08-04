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

interface Props {
  authStore?: AuthStore;
  history: History;
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
    email: '',
    password: '',
  });
  private handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => this.form.push('email', event.currentTarget.value);
  private handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => this.form.push('password', event.currentTarget.value);
  private handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.authStore!.login(this.form.currentState(), () => {
      this.props.history.replace('/');
    });
  }

  render() {
    const { loading } = this.props.authStore!;

    return (
      <Fragment>
        <Helmet
          title='sign in'
        />
        <Background>
          <SplashBackground />
          <Content>
            <IconWrapper>
              <Icon name='logo' />
            </IconWrapper>
            <Form onSubmit={this.handleSubmitForm}>
              <H size={2} margin={20}>Welcome back!</H>
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

              <Button type='submit' disabled={loading}>
                sign in
              </Button>

              <NavRow
                links={[
                  {
                    linkTo: '/',
                    value: 'home',
                  },
                  {
                    linkTo: '/register',
                    value: 'register',
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
