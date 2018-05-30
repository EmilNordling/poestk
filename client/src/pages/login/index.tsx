import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { colors } from '../../constants';
import { FieldsetItem, Fieldset, Form, Button } from '../../common/field';

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
`

@inject('authStore')
@observer
class Register extends Component {
  handleEmailChange = (event: Event) => this.props.authStore.setEmail(event.target.value);
  handlePasswordChange = (event: Event) => this.props.authStore.setPassword(event.target.value);
  handleSubmitForm = (event: Event) => {
    event.preventDefault();

    this.props.authStore.login(() => {
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
          <h1>Sign in</h1>
          <Fieldset>
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
          </Fieldset>

          <Button type="submit" disabled={inProgress}>
            Sign in
          </Button>
        </Form>
      </Content>
    )
  }
}

export default Register
