import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';
import { isEqualWith } from 'lodash';
import { colors } from '../../constants';
import { touch } from '../../utils/isMobile';
import Emitter from '../../../../pst/src/core/Emitter';
import setStyle from '../../utils/attrStyleUpdate'
import Allocated from '../Allocated';

const BottomBarStyle = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
  padding: 0 20%;
  width: 100%;
  border-bottom: 1px solid ${colors.gray250};
`

const Dragabble = styled.div.attrs({
  dragabblepure: '',
})`
  z-index: 1;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.2);
  background: ${colors.gray400};
  position: absolute;
  left: 0;
  right: 0;
  bottom: -100vh;
  height: 100vh;
  transform: translateY(-40px);
`

const Button = styled.div`
  background: red;
  width: 40px;
  height: 100%;
`

@inject('guiStore')
@observer
class BottomBar extends Component {
  readonly minHeight = 40;
  private snapshot: number;
  private snapshotHeight: number;
  private currentHeight = this.minHeight;
  public props: {
    guiStore?: GUI | any,
  };

  set bottomBar(value) {
    this.props.guiStore.bottomBar = value;
  }

  @computed get bottomBar() {
    console.log('xd')

    return this.props.guiStore.bottomBar;
  }

  constructor(props: any) {
    super(props);
  }

  private updatePureCSS() {
    setStyle(`
      [dragabblepure] {
        transform: translateY(-${this.bottomBar}px);
      }
    `);
  }

  private toggleMenu = () => {
    this.props.guiStore.characterInfoOpen = !this.props.guiStore.characterInfoOpen;
  }

  private change = () => {
    this.props.guiStore.bottomBar = 100;
  }

  private dragStart(event: React.TouchEvent<HTMLDivElement>) {
    Emitter.unbindNativeEvents();
    this.snapshot = event.nativeEvent.targetTouches[0].clientY;
    this.snapshotHeight = this.bottomBar;
  }

  private drag = (event: React.TouchEvent<HTMLDivElement>) => {
    const diff = this.snapshot - event.nativeEvent.targetTouches[0].clientY;
    const newHeight = this.snapshotHeight + diff;

    if (newHeight < this.minHeight) return;

    this.bottomBar = newHeight;

    this.updatePureCSS();
  }

  private dragEnd = () => {
    Emitter.rebindNativeEvents();
  }

  public componentDidUpdate() {
    this.updatePureCSS();
  }

  public render() {
    return (
      <Dragabble
        custom-attribute='??????'
        onTouchStart={(affects) => this.dragStart(affects)}
        onTouchMove={this.drag}
        onTouchEnd={this.dragEnd}
      >
        <BottomBarStyle>
          <Button onClick={this.toggleMenu} />
          <Button onClick={this.change}/>
          <Button onClick={this.toggleMenu} />
        </BottomBarStyle>
        <Allocated />
      </Dragabble>
    )
  }
}

export default BottomBar
