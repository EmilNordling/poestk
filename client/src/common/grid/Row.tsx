import React, { Component, cloneElement, Children } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const RowStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  align-content: flex-start;
  margin: 0 ${props => props.gutter === 0 ? 'auto' : '-' + props.gutter / 2 + 'px'} 10px;

  &:last-of-type {
    margin-bottom: 0;
  }
`

export class Row extends Component {
  static defaultProps = {
    gutter: 0,
  };

  static propTypes = {
    gutter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }

  render() {
    const { children, ...rest } = this.props;
    const cols = Children.map(children, (col: React.ReactElement<HTMLDivElement>) => {
      if (!col) return null;

      return cloneElement(col, { gutter: this.props.gutter });
    });

    return <RowStyle { ...rest }>{cols}</RowStyle>
  }
}

export default Row;
