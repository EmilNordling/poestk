import React from 'react';
import styled, { css } from 'styled-components';
import { colors, media } from '../../constants';
import ThemeHolder, { withCSSVar } from '../../utils/ThemeHolder';

export type FormFieldParams = {
  label?: string,
  value?: string,
  type: string,
  id?: string,
  errorMessage?: string,
  name?: string,
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void,
};

const Button = styled.button`
  display: inline-block;
  width: 100%;
  padding: 15px 24px;
  border: 1px solid #1d1f24;
  vertical-align: top;
  outline: none;
  border-radius: 4px;
  font-family: ${withCSSVar(ThemeHolder.current.fontFamily)};
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1em;
  text-align: center;
  text-decoration: none;
  color: #ffffff;
  background-color: #847aff;
  background-image: linear-gradient(90deg, rgba(219, 86, 255, 0.62) -20%, rgba(108, 96, 255, 0.52));
  transition: background-color 0.2s ease, color 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #3f3b7b;
    color: #dcdcdc;
  }
`;

const Label = styled.div`
  margin-bottom: 10px;
  font-size: 1.6rem;
  transition: all 0.2s;
  pointer-events: none;
  color: ${colors.color};
`;

const inFocus = () => `
  font-size: 1.4rem;
  top: 16px;
  color: #fefefe;
`;

const FieldContent = styled.div`
  position: relative;
  margin-bottom: 20px;
  text-align: left;

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

const FieldInput = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  outline: none;
  background: rgba(0, 0, 0, 0.1);
  font-size: 1.6rem;
  transition: transform 0.2s;
  transition: background-color 0.2s;
  color: #fefefe;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
`;

const Fieldset = styled.fieldset`
  width: 100%;
  padding: 0;
  margin-bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  background: ${colors.input};
  transition: all 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

const FieldsetItem = ({ label, errorMessage, ...props }: FormFieldParams) => (
  <FieldContent>
    {label && <Label>{label}</Label>}
    <FieldInput required='required' {...props as any} />
  </FieldContent>
);

export {
  FieldsetItem,
  Fieldset,
  Form,
  Button,
};
