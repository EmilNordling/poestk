import styled from 'styled-components';
import InputBase from '../../base/InputBase';

export const TextFieldStyle = styled.div<{ fixedWidth?: number }>`
  min-width: 200px;
	width: 100%;
	max-width: ${({ fixedWidth }) => fixedWidth ? `${fixedWidth}px` : '100%' };
  position: relative;
  display: inline-flex;
  flex-direction: column;
`;

export const Border = styled.div`
  position: absolute;
  bottom: 2px;
  left: 0;
  height: 5px;
  width: 100%;
  border: 1px solid #cecece;
  border-top: none;
  transition: border-color 300ms ease;
`;

export const Label = styled.label`
  transition: color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
  transform-origin: top left;
  top: 0;
  left: 10px;
  position: absolute;
  transform: translate(0, 7px) scale(1);
  user-select: none;
`;

export const InputWrapper = styled.div`
  position: relative;
  padding: 0px 10px;
  margin-top: 15px;
`;

export const HelperText = styled.div`
  font-size: 14px;
  color: #a5a5a5;
  margin-top: 10px;
  padding: 0px 10px;
  text-align: right;
`;

export const InputStyle = styled(InputBase)<any>`
  &:hover ~ ${Border} {
    border-color: #808080;
  }

  &:focus ~ ${Border} {
    border-color: #808080;
  }

  &:focus ~ ${Label}, &:not([value='']) ~ ${Label} {
    transform: translate(0, -12px) scale(0.8);
  }

  &:invalid:not([value='']) {
    background: rgba(255, 28, 27, 0.1);
  }

  &::placeholder {
    opacity: 0;
  }

  &:focus::placeholder {
    opacity: 1;
  }
`;
