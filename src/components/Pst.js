import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import Wrapper from '../../../pst/src/corev2/Wrapper'

const PstContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  user-select: none;
`

@inject('nodeDataStore')
@observer

class Pst extends React.Component {
  state = {
    isLoading: true,
    error: false,
  }

  async componentDidMount() {
    if (!Wrapper.loaded) {
      await this.props.nodeDataStore.getPassiveData()

      Wrapper.popularizeTiles(this.props.nodeDataStore)
    }

    Wrapper.mountCanvas(this.canvas)
  }

  render() {
    return (
      <PstContainer innerRef={(ref) => { this.canvas = ref }} />
    )
  }
}

export default Pst
