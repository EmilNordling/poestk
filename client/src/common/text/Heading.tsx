import React, { Component, cloneElement, Children } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HeadingStyle = styled.div`

`

class Heading extends Component {
  render() {
    const { children, ...rest } = this.props;

    return <HeadingStyle {...rest}>{children}</HeadingStyle>
  }
}

export default Heading;
