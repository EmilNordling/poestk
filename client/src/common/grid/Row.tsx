import React, { cloneElement, Children, ReactElement } from 'react';
import styled, { css } from 'styled-components';

interface RowProps {
  gutter?: number;
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
}

const RowStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  align-content: flex-start;
  margin: 0 ${(props: RowProps) => props.gutter === 0 ? 'auto' : '-' + props.gutter / 2 + 'px'} 10px;

  ${(props) => props.justify && css`
    justify-content: ${props.justify === 'start' ? 'flex-start' : props.justify === 'end' ? 'flex-end' : props.justify }
  `};

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Row: React.SFC<RowProps> = (props) => {
  const { children, ...rest } = props;
  const cols = Children.map(children, (col: ReactElement<RowProps>) => {
    if (!col) return null;

    return cloneElement(col, { gutter: props.gutter });
  });

  return <RowStyle {...rest}>{cols}</RowStyle>;
};

Row.defaultProps = {
  gutter: 0,
};

export default Row;
