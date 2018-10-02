import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { H, P } from '../../../common/text';
import Row from '../../../common/grid/Row';
import Col from '../../../common/grid/Col';
import { ListItem } from './';
import { inject, observer } from 'mobx-react';
import { AuthStore } from '../../../stores';
import formGroup from '../../../utils/formGroup';
import { FieldsetItem } from '../../../common/_field';
import Button from '../../../common/button';

interface AccountProps {
  authStore?: AuthStore;
}

@inject('authStore')
@observer
class Account extends Component<AccountProps> {
  private form = formGroup({
    username: this.props.authStore!.currentUser.username,
    email: this.props.authStore!.currentUser.email,
    password: '',
    passwordConfirm: '',
  });
  private handleUsernameChange = (event: React.FormEvent<HTMLInputElement>) => this.form.push('username', event.currentTarget.value);
  private handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => this.form.push('email', event.currentTarget.value);
  private handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(this.form.currentState());

    this.props.authStore!.update(this.form.currentState());
  }

  render() {
    return (
      <Fragment>
        <Helmet
          title='Account'
        />
        <H size={1}>Account</H>
        <ListItem>
          <Row gutter={20}>
            <Col span={10}>
              <H size={3} margin={10}>Profile</H>
              <P>The email is your identity on Poestk.</P>
            </Col>
            <Col span={14}>
              <FieldsetItem label='Username' type='text' value={this.form.pull('username')} onChange={this.handleUsernameChange}/>
              <FieldsetItem label='Username' type='text' value={this.form.pull('email')} onChange={this.handleEmailChange}/>
            </Col>
          </Row>
          <Row justify='end'>
            <Button onClick={this.handleSubmitForm}>save</Button>
          </Row>
        </ListItem>
      </Fragment>
    );
  }
}

export default Account;
