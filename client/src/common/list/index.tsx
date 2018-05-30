import React from 'react';
import styled from 'styled-components';
import { colors, fontFamily } from '../../constants';

const ListItemStyle = styled.div`
  display: flex;
  align-items: center;
  height: 35px;
  padding: 0 15px;
  color: ${colors.main_color};
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.15);
  }
`

const ListStyle = styled.div`
  width: 200px;
  padding: 0;
  margin-bottom: 20px;
  border: 1px solid rgba(0,0,0,0.3);
  border-radius: 4px;
  background: ${colors.main_backdrop};
  transition: all 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`

const Icon = styled.div`
  width: 20px;
  height: 20px;
  background: red;
`

const Label = styled.div`
  margin-bottom: 2px;
  margin-left: 10px;
  font-size: 1.6rem;
`

export const Border = styled.div`
  border-bottom: 1px solid ${colors.main_content};
`

export const List = ({ ...props }) => (
  <ListStyle>
    {props.children}
  </ListStyle>
);

export const ListItem = ({ icon, ...props }) => (
  <ListItemStyle {...props}>
    <Icon />
    <Label>{props.children}</Label>
  </ListItemStyle>
);
