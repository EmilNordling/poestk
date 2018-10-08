import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { H } from '../../../common/text';
import { AuthStore } from '../../../stores';
import formGroup from '../../../utils/formGroup';
import { Field } from '../../../common/_field';
import EditField from '../EditField';

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
