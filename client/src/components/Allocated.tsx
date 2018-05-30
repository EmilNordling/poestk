import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from '../constants';
import { computed, observe } from 'mobx';
import { observer, inject } from 'mobx-react';
import { touch } from '../utils/isMobile';
import Emitter from '../../../pst/src/core/Emitter';
import { reset, decodeTree, changeClass, redraw } from '../../../pst/src/core/publicAPI';
import { scheme } from '../../../mod';

const Info = styled.div`
  width: 100%;
  overflow-y: auto;
`

const Item = styled.div`
  padding: 0 10px 5px;
  font-weight: 600;
`

@inject('allocationStore')
@observer
class Allocated extends Component {
  constructor(props: any) {
    super(props);

    Emitter.on('forceRender', () => this.force());
  }

  @computed get bundle () {
    return this.props.allocationStore.bundle;
  }

  get stats() {
    return this.props.allocationStore.stats;
  }

  public reset() {
    this.stats = {};

    this.forceUpdate();
  }

  private force() {
    this.forceUpdate();
  }

  render() {
    const stats = Object.keys(this.stats).map((x) => {
      let desc = scheme[x]
      const hashCount = desc.match(/#/g) || []

      if (hashCount.length > 1) {
        hashCount.forEach((value: any, index: number) => {
          desc = desc.replace('#', this.stats[x].value[index]);
        })
      } else if (hashCount.length === 1) {
        desc = desc.replace('#', this.stats[x].value);
      }

      return (
        <Item key={this.stats[x].id}>
          <p>{ desc }</p>
        </Item>
      )
    })

    return (
      <Info>{ stats }</Info>
    )
  }
}

export default Allocated
