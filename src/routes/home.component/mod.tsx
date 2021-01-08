import styled from 'styled-components';
import { Text, Layout } from 'one-atom';

interface Props {}

const elements = {
  content: styled.div`
    display: flex;
    flex-direction: column;
    --oa-text-h3-size: 1.25rem;
    --oa-text-h3-weight: 700;
    background: #000;
    width: 100%;
  `,
  searchBarTheme: styled.div`
    display: contents;
    color: #666666;
    --oa_separator_bg: #252525;
  `,
};

export const Home: FC<Props> = () => {
  return (
    <elements.content>
      <Layout height="95vh" shrink={false} alignment="center">
        <Text.h1_plus>poestk</Text.h1_plus>
      </Layout>
      <Layout height="95vh" shrink={false}></Layout>
    </elements.content>
  );
};
