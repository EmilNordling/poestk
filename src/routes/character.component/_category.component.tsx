import { Text, Layout } from 'one-atom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {}

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

export const Category: FC<Props> = ({ children }) => {
  return (
    <elements.theme>
      <Layout alignment="topLeading" margin="0 0 35px">
        <elements.header>{children}</elements.header>
        <elements.item to="./123">
          <Text.h4>eee</Text.h4>
        </elements.item>
        <elements.item to="./123">
          <Text.h4>xxx</Text.h4>
        </elements.item>
      </Layout>
    </elements.theme>
  );
};
