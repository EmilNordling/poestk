import React, { Component, cloneElement, Children } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TitleStyle = styled.div`

`

class Title extends Component {
  render() {
    const { children, ...rest } = this.props;

    return <TitleStyle {...rest}>{children}</TitleStyle>
  }
}

export default Title;
