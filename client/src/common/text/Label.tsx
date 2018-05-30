import React, { Component, cloneElement, Children } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LabelStyle = styled.div`
  margin-bottom: 15px;
  font-size: 1.6rem;
  font-family: inherit;
`

class Label extends Component {
  render() {
    const { children, ...rest } = this.props;

    return <LabelStyle {...rest}>{children}</LabelStyle>
  }
}

export default Label;
