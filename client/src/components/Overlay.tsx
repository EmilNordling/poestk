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

  &:enter {
    opacity: 0.01;
  }
  &:enter-active {
    opacity: 1;
    transition: opacity ${duration}ms ease;
  }
  &:exit {
    opacity: 1;
  }
  &:exit-active {
    opacity: 0.01;
    transition: opacity ${duration}ms ease;
  }
`

@inject('guiStore')
@observer
class Overlay extends Component {
  props: { guiStore?: GUI | any } = {};
  node: HTMLElement;

  constructor(props: any) {
    super(props)

    this.handleOutsideClick = this.handleOutsideClick.bind(this)
  }

  @computed get menuState() {
    return this.props.guiStore.overlayOpen
  }

  handleOutsideClick(event: Event) {
    if (this.node.contains(event.target as HTMLElement)) {
      return
    }

    this.props.guiStore.overlayOpen = false
  }

  closeOverlay = () => {
    this.props.guiStore.overlayOpen = false
  }

  render() {
    return (
      <TransitionGroup>
        {this.menuState &&
          <Inner innerRef={(node: HTMLElement) => { this.node = node }} onClick={this.closeOverlay} />
        }
      </TransitionGroup>
    )
  }
}

export default Overlay
