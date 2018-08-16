import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { AuthStore } from '../../stores';
import { Form, FieldsetItem, Button } from '../../common/fieldAlt';
import { H } from '../../common/text';
import NavRow from '../../components/NavRow';
import formGroup from '../../utils/formGroup';

interface Props {
  authStore?: AuthStore;
}

@inject('authStore')
@observer
class AddCharacters extends Component<Props> {
  private addCharactersForm = formGroup({
    account: '',
  });
  private handleConnectPoeAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.authStore!.getCharacters(this.addCharactersForm.pull('account'));
  }
  private handleAccountChange = (event: React.FormEvent<HTMLInputElement>) => this.addCharactersForm.push('account', event.currentTarget.value);

  render() {
    const { loading } = this.props.authStore!;

    return (
      <Form onSubmit={this.handleConnectPoeAccount}>
        <H size={2} margin={20}>Connect</H>
        <FieldsetItem
          type='text'
          value={this.addCharactersForm.pull('account')}
          onChange={this.handleAccountChange}
        />

        <Button type='submit' disabled={loading}>
          connect
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
    );
  }
}

export default AddCharacters;
