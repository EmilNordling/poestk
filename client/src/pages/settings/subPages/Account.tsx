import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { H, P } from '../../../common/text';
import Row from '../../../common/grid/Row';
import Col from '../../../common/grid/Col';
import { inject, observer } from 'mobx-react';
import { AuthStore } from '../../../stores';
import formGroup, { formControl } from '../../../utils/formGroup';
import { FieldsetItem, Field } from '../../../common/_field';
import Button from '../../../common/button';
import EditField, { ListItem } from '../EditField';

interface AccountProps {
  authStore?: AuthStore;
}

@inject('authStore')
@observer
class Account extends Component<AccountProps> {
  private accountForm = formGroup({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  private handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.accountForm.isValid() && this.props.authStore!.update(this.accountForm.currentState());
  }

  render() {
    return (
      <Fragment>
        <Helmet
          title='Account'
        />
        <H size={1}>Account</H>

        <EditField onClick={this.handleSubmitForm} info={{ title: 'Profile', description: 'The email is your identity on Poestk.' }}>
          <Field label='Username' type='text' formGroup={this.accountForm} property='username'/>
          <Field label='Email' type='text' formGroup={this.accountForm} property='email' />
          <Field label='Password' type='text' formGroup={this.accountForm} property='password' />
        </EditField>
      </Fragment>
    );
  }
}

export default Account;
