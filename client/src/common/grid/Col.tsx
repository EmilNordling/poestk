import React, { Component, cloneElement, Children } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ColStyle = styled.div`
  width: ${props => props.span === 0 ? '100%' : 100 / props.span + '%'};
  padding: 0 ${props => props.gutter === 0 ? 'auto' : props.gutter / 2 + 'px'};
`

class Col extends Component {
  static propTypes = {
    span: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    gutter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }

  render() {
    const { children, ...rest } = this.props;

    return <ColStyle {...rest}>{children}</ColStyle>
  }
}

export default Col;
