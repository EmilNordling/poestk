import React, { Component } from 'react'
import { TransitionGroup } from 'react-transition-group'
import transition from 'styled-transition-group'
import { computed } from 'mobx'
import { observer, inject } from 'mobx-react'

const duration = 300

const Inner = transition.div.attrs({
  unmountOnExit: true,
  timeout: duration,
})`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.52);
  z-index: 1;
  opacity: ${(props: any) => props.precent / 100};
  transition: opacity ${duration}ms ease;

  &:enter {
    opacity: 0.01;
  }
  &:enter-active {

  }
  &:exit {

  }
  &:exit-active {
    opacity: 0.01;
  }
`

@inject('guiStore')
@observer
class Overlay extends Component {
  public props: { guiStore?: GUI | any };
  private node: HTMLElement;

  set precent(value) {
    this.props.guiStore.overlayPrecent = value
  }

  @computed get precent() {
    return this.props.guiStore.overlayPrecent
  }

  @computed get menuState() {
    let precent;

    if (this.props.guiStore.overlayOpen) {
      precent = 100;

      this.precent = precent
    } else {
      precent = this.props.guiStore.overlayPrecent
    }

    return precent > 0
  }

  constructor(props: any) {
    super(props)

    this.handleOutsideClick = this.handleOutsideClick.bind(this)
  }

  private handleOutsideClick(event: Event) {
    if (this.node.contains(event.target as HTMLElement)) {
      return
    }

    this.props.guiStore.overlayOpen = false
  }

  private closeOverlay = () => {
    this.props.guiStore.overlayOpen = false
  }

  render() {
    return (
      <TransitionGroup>
        {this.menuState &&
          <Inner precent = {this.precent} innerRef={(node: HTMLElement) => { this.node = node }} onClick={this.closeOverlay} />
        }
      </TransitionGroup>
    )
  }
}

export default Overlay
