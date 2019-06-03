import styled from 'styled-components';

interface Props {
	padding?: number;
	marginBottom?: number;
}

const ContentCard = styled('div')<Props>`
  background: #ffffff;
  padding: ${({ padding }) => typeof padding === 'number' ? padding : 45}px;
  border-radius: 4px;
  box-shadow: 0 0 1px rgba(0,0,0,.1), 0 3px 6px rgba(0,0,0,0.05);
  max-width: 1024px;
	width: 100%;
  margin: 0 auto;
	${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom}px` }
`;

export default ContentCard;
