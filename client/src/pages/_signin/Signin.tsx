import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components';
import { inject, observer } from 'mobx-react';
import { AuthStore } from '../../stores';
import { Form, Fieldset, FieldsetItem, Button } from '../../common/_field';
import { H } from '../../common/text';
import NavRow from '../../components/NavRow';
import formGroup from '../../utils/formGroup';
import { colors } from '../../constants';
import Icon from '../../common/icon';
import { Helmet } from 'react-helmet';
import { History } from 'history';
import ThemeHolder from '../../utils/ThemeHolder';
import { Gradient, SplashBackground } from '../../common/shared/backgrounds';
import { IconWrapper } from '../../common/shared/misc';
import Card from '../../common/card/index';

interface Props {
  authStore?: AuthStore;
  history: History;
}

const Content = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  min-height: 1000px;
  z-index: 1;
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

    const { useBorders } = ThemeHolder;

    return (
      <Gradient>
        <SplashBackground>
          <Content>
            <IconWrapper>
              <Icon name='logo' />
            </IconWrapper>
              <Card width={480}>
                <Form onSubmit={this.handleSubmitForm}>
                  qwe
                </Form>
              </Card>
          </Content>
        </SplashBackground>
      </Gradient>
    );
  }
}

export default Register;
