import React from 'react';
import styled from 'styled-components';
import { colors, fontFamily } from '../../constants';

export type FormFieldParams = {
  label: string,
  value: string,
  type: string,
  id?: string,
  errorMessage?: string,
  name?: string,
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void,
};

const Button = styled.button`
  display: inline-block;
  padding: 15px 24px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  vertical-align: top;
  outline: none;
  border-radius: 4px;
  font-family: ${fontFamily};
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1em;
  text-align: center;
  text-decoration: none;
  color: #fefefe;
  background: ${colors.main_background_input};
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

  &:hover {
    background: rgba(0, 0, 0, 0.15);
  }
`;

const Label = styled.label`
  position: absolute;
  top: 26px;
  left: 20px;
  font-size: 1.6rem;
  transition: all 0.2s;
  pointer-events: none;
  color: #fefefe;
`;

const inFocus = () => `
  font-size: 1.4rem;
  top: 16px;
  color: #fefefe;
`;

const FieldContent = styled.div`
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);

  & input:focus + label {
    ${inFocus()}
  }

  & input:not([value='']) + label {
    ${inFocus()}
  }

  & input:invalid:not([value='']) {
    background: rgba(255, 28, 27, 0.1);
  }

  &:last-child {
    border-bottom: 0;
  }
`;

const Input = styled.input`
  display: block;
  width: 100%;
  border: 0;
  outline: none;
  font-size: 1.6rem;
  transition: transform 0.2s;
`;

const FieldInput = Input.extend`
  padding: 32px 20px 16px;
  transition: background-color 0.2s;
  background: rgba(255, 255, 255, 0);
  color: #fefefe;
`;

const Form = styled.form`
  width: 300px;
  text-align: center;
`;

const Fieldset = styled.fieldset`
  width: 100%;
  padding: 0;
  margin-bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  background: ${colors.main_background_input};
  transition: all 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

const FieldsetItem = ({ label, errorMessage, ...props }: FormFieldParams) => (
  <FieldContent>
    <FieldInput required='required' {...props as any} />
    <Label>{ label }</Label>
  </FieldContent>
);

export {
  FieldsetItem,
  Fieldset,
  Form,
  Input,
  Button,
};
