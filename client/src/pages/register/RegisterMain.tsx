import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { AuthStore } from '../../stores';
import { History } from 'history';
import { observable } from 'mobx';
import Register from './Register';
import AddCharacters from './AddCharacters';

interface Props {
  authStore?: AuthStore;
  history: History;
}

export enum RegisterState {
  register,
  addCharacters,
}

@inject('authStore')
@observer
class RegisterMain extends Component<Props> {
  @observable private registerState: RegisterState = RegisterState.addCharacters;

  public changeView = (newState: RegisterState) => {
    this.registerState = newState;
  }

  render() {
    const { loading } = this.props.authStore!;

    return (
      <Fragment>
      <Register onSubmit={this.changeView}/>
        {/* {this.registerState === RegisterState.register ?
        :
          <AddCharacters />
        } */}
      </Fragment>
    );
  }
}

export default RegisterMain;
