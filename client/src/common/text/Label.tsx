import React from 'react';
import styled from 'styled-components';

const LabelStyle = styled.div`
  margin-bottom: 15px;
  font-size: 1.6rem;
  font-family: inherit;
`;

const Label: React.SFC = ({ children, ...rest }) => (
  <LabelStyle {...rest}>{children}</LabelStyle>
);

export default Label;
