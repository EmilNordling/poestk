import styled from 'styled-components';

const Reset = styled.div<{ amount: number }>`
  margin-right: -${({ amount }) => amount}px;
	margin-left: -${({ amount }) => amount}px;
`;

export default Reset;
