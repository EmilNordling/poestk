import React, { Component } from 'react'
import styled from 'styled-components'

const NotFound = styled.div`
  padding: 10px 0;
  text-align: center;
  font-size: 4rem;
`

class Home extends Component {
  render() {
    return (
      <NotFound>
        404
      </NotFound>
    )
  }
}

export default Home
