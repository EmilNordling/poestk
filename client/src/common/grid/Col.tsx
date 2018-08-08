import React from 'react';
import styled from 'styled-components';

interface ColProps {
  span?: number;
  gutter?: number;
}

const base = 24;

const ColStyle = styled.div`
  box-sizing: border-box;
  width: ${(props: ColProps) => props.span === 0 ? '100%' : (100 / (base / props.span!)).toString() + '%'};
  padding: 0 ${(props: ColProps) => props.gutter === 0 ? 'auto' : props.gutter! / 2 + 'px'};
`;

const Col: React.SFC<ColProps> = (props) => {
  const { children, ...rest } = props;

  return <ColStyle {...rest}>{children}</ColStyle>;
};

Col.defaultProps = {
  span: 0,
  gutter: 0,
};

export default Col;
