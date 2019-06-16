import styled, { StyledComponent, ThemedBaseStyledInterface } from 'styled-components';
import InputBase from '../../base/InputBase/index';
import { colors } from '../../../modules/theme/colors';

const InputStyle = (styled(InputBase)`
	visibility: hidden;
` as React.ComponentType) as new () => any;

const ToggleStyle = styled.div`
	margin: 5px 10px;
	position: relative;
	width: 40px;
	height: 20px;
	display: inline-flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	touch-action: pan-y;
`;

const Bar = styled.div`
	position: absolute;
	box-sizing: content-box;
	background: ${colors.remove};
	cursor: pointer;
	height: 24px;
	width: 44px;
	left: -2px;
	border-radius: 20px;
	transition: background-color ease 200ms;
`;

const Dragger = styled.div`
	position: absolute;
	left: 0px;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background: ${colors.remove};
	cursor: grab;
	transition: background-color, transform ease 200ms;
	box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.44);

	&.js-dragging {
		transition: background-color ease 200ms;
	}
`;

export default {
	InputStyle,
	ToggleStyle,
	Bar,
	Dragger,
};
