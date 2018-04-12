import React, { Component } from 'react'
import styled from 'styled-components'

const Menu = styled.section`
  display: flex;
`

class Dropdown extends Component {
  componentDidMount() {
    console.log('xd')
  }

  render() {
    const { children } = this.props

    const child = React.Children.only(children)

    const item = React.cloneElement(child, {
      className: child.props.className,
    })

    return (
      <Menu {...this.props}>
        {item}
      </Menu>
    )
  }
}

export default Dropdown
