import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import Pst from '../../components/Pst'

const Content = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

@observer
class Home extends Component {
  render() {
    return (
      <Content>
        <Pst />
      </Content>
    )
  }
}

export default Home
