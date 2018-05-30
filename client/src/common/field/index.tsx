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
  onChange?: any,
}

const Button = styled.button`
  display: inline-block;
  padding: 15px 24px;
  border: 1px solid rgba(0,0,0,0.3);
  vertical-align: top;
  outline: none;
  border-radius: 4px;
  font-family: ${fontFamily};
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1em;
  text-align: center;
  text-decoration: none;
  color: ${colors.main_color};
  background: ${colors.main_backdrop};
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

  &:hover {
    background: rgba(0, 0, 0, 0.15);
  }
`

const Label = styled.label`
  position: absolute;
  top: 26px;
  left: 20px;
  font-size: 1.6rem;
  transition: all 0.2s;
  pointer-events: none;
  color: ${colors.main_color_dimmed};
`

const inFocus = () => `
  font-size: 1.4rem;
  top: 16px;
  color: ${colors.main_color};
`

const FieldContent = styled.div`
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);

  & input:focus + label {
    ${inFocus()}
  }

  & input:not([value=""]) + label {
    ${inFocus()}
  }

  & input:invalid:not([value=""]) {
    background: rgba(255, 28, 27, 0.1);
  }

  &:last-child {
    border-bottom: 0;
  }
`

const Input = styled.input`
  border: 0;
  outline: none;
  font-size: 1.6rem;
  width: 100%;
  display: block;
  transition: transform 0.2s;
`

const FieldInput = Input.extend`
  transition: background-color 0.2s;
  padding: 32px 20px 16px;
  background: rgba(255, 255, 255, 0);
  color: ${colors.main_color};
`

const Form = styled.form`
  text-align: center;
  width: 300px;
`

const Fieldset = styled.fieldset`
  padding: 0;
  margin-bottom: 20px;
  border-radius: 4px;
  background: ${colors.main_backdrop};
  width: 100%;
  transition: all 0.2s;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0,0,0,0.3);
`

const FieldsetItem = ({ label, errorMessage, ...props, }: FormFieldParams) => (
  <FieldContent>
    <FieldInput required="required" { ...props as any }/>
    <Label>{ label }</Label>
  </FieldContent>
);

export {
  FieldsetItem,
  Fieldset,
  Form,
  Input,
  Button,
}
