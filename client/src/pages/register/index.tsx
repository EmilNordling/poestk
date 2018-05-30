import React, { Component } from 'react';
import styled from 'styled-components';
import { FieldsetItem, Fieldset, Form, Button } from '../../common/field';
import { inject, observer } from 'mobx-react';
import { colors } from '../../constants';

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
`

@inject('authStore')
@observer
class Register extends Component {
  handleUsernameChange = (event: Event) => this.props.authStore.setUsername(event.target.value);
  handleEmailChange = (event: Event) => this.props.authStore.setEmail(event.target.value);
  handlePasswordChange = (event: Event) => this.props.authStore.setPassword(event.target.value);
  handlepasswordConfirmChange = (event: Event) => this.props.authStore.setPasswordConfirm(event.target.value);
  handleSubmitForm = (event: Event) => {
    event.preventDefault();

    this.props.authStore.register(() => {
      this.props.history.replace('/');
    });
  };

  componentWillUnmount() {
    this.props.authStore.reset();
  }

  render() {
    const { values, errors, inProgress } = this.props.authStore;

    return (
      <Content>
        <Form onSubmit={this.handleSubmitForm}>
          <h1>Register</h1>
          <Fieldset>
            <FieldsetItem
              label="username"
              type="text"
              value={values.username}
              onChange={this.handleUsernameChange}
            />
            <FieldsetItem
              label="email"
              type="Email"
              value={values.email}
              onChange={this.handleEmailChange}
            />
            <FieldsetItem
              label="password"
              type="Password"
              value={values.password}
              onChange={this.handlePasswordChange}
            />
            <FieldsetItem
              label="repeat password"
              type="Password"
              value={values.passwordConfirm}
              onChange={this.handlepasswordConfirmChange}
            />
          </Fieldset>

          <Button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={inProgress}
          >
            create
          </Button>
        </Form>
      </Content>
    )
  }
}

export default Register
