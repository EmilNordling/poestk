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
  background: #00000085;
  z-index: 0;

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

// TODO: capture parent states
@inject('guiState')
@observer
class Overlay extends Component {
  constructor(props) {
    super(props)

    this.handleOutsideClick = this.handleOutsideClick.bind(this)
  }

  @computed get menuState() {
    return this.props.guiState.characterInfoOpen
  }

  handleOutsideClick(event) {
    if (this.node.contains(event.target)) {
      return
    }

    this.props.guiState.characterInfoOpen = false
  }

  closeMenu = () => {
    this.props.guiState.characterInfoOpen = false
  }

  render() {
    return (
      <TransitionGroup>
        {this.menuState &&
          <Inner innerRef={(node) => { this.node = node }} onClick={this.closeMenu} />
        }
      </TransitionGroup>
    )
  }
}

export default Overlay
