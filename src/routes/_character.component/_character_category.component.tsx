import { Text, View } from 'one-atom';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export namespace Category {
  const elements = {
    header: styled.div`
      margin-bottom: 10px;
    `,
    item: styled(Link)`
      display: flex;
      align-items: center;
      width: 100%;
      padding: 12px 20px;
      margin: 0 -20px;
      border-radius: 10px;
      box-sizing: content-box;

      &:hover {
        background: #181818;
      }
    `,
    theme: styled.div`
      display: contents;
    `,
  };

  export const h: FC = function Character_Category({ children }) {
    return (
      <elements.theme>
        <View.h alignment="topLeading" margin="0 0 35px">
          <elements.header>{children}</elements.header>
          <elements.item to="./123">
            <Text.h4>eee</Text.h4>
          </elements.item>
          <elements.item to="./123">
            <Text.h4>xxx</Text.h4>
          </elements.item>
        </View.h>
      </elements.theme>
    );
  };
}
