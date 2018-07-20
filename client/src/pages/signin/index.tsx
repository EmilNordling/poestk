import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { AuthStore } from '../../stores';
import Page from '../../components/Page';
import { Form, Fieldset, FieldsetItem, Button } from '../../common/field';
import { H } from '../../common/text';
import NavRow from '../../components/NavRow';

const Content = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5%;
`;

@inject('authStore')
@observer
class Signin extends Component<{ authStore?: AuthStore }> {
  public state = this.defaultState;
  private get defaultState() {
    return {
      email: '',
      password: '',
    };
  }

  public componentWillMount() {
    this.setState(this.defaultState);
  }

  public componentWillUnmount() {
    this.setState(this.defaultState);
  }

  private handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => this.setState({ email: event.currentTarget.value });
  private handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => this.setState({ password: event.currentTarget.value });
  private handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.authStore!.login(this.state, () => {
      this.props.history.replace('/');
    });
  }

  render() {
    const { email, password } = this.state;
    const { loading } = this.props.authStore!;

    return (
      <Page showHeader={false} title='Sign in! 🎉'>
        <Content>
          <Form onSubmit={this.handleSubmitForm}>
            <H size={2} margin={true}>Sign in! 🎉</H>
            <Fieldset>
              <FieldsetItem
                label='email'
                type='Email'
                value={email}
                onChange={this.handleEmailChange}
              />
              <FieldsetItem
                label='password'
                type='Password'
                value={password}
                onChange={this.handlePasswordChange}
              />
            </Fieldset>

            <Button type='submit' disabled={loading}>
              Sign in
            </Button>

            <NavRow
              links={
                [{
                  linkTo: '/',
                  value: 'home',
                },
                {
                  linkTo: '/register',
                  value: 'register',
                }]
              }
            />
          </Form>
        </Content>
      </Page>
    );
  }
}

export default Signin;
