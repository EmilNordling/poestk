import React, { Component } from 'react'
import styled from 'styled-components'
import { colors } from '../constants'
import { computed } from 'mobx'
import { observer, inject } from 'mobx-react'

const BottomBarStyle = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
  background: ${colors.gray400};
  z-index: 1;
  padding: 0 20%;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.2);
`

const Item = styled.div`
  background: red;
  width: 40px;
  height: 100%;
`

@inject('guiStore')
@observer
class BottomBar extends Component {
  props: { guiStore?: GUI | any } = {};

  @computed get menuState() {
    return this.props.guiStore.characterInfoOpen
  }

  toggleMenu = () => {
    this.props.guiStore.characterInfoOpen = !this.props.guiStore.characterInfoOpen
  }

  render() {
    return (
      <BottomBarStyle>
        <Item onClick={this.toggleMenu} />
        <Item />
        <Item />
      </BottomBarStyle>
    )
  }
}

export default BottomBar
