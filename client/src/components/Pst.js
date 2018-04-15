import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { renderer, Emitter } from '../../../pst/src/core'
import NodeInfo from './NodeInfo'

const PstContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  user-select: none;
`

@inject('nodeDataStore')
@observer
class Pst extends Component {
  async componentDidMount() {
    await this.props.nodeDataStore.getPassiveData()

    renderer.mountCanvas(this.canvas)
  }

  render() {
    return (
      <PstContainer innerRef={(ref) => { this.canvas = ref }} />
    )
  }
}

export default Pst
