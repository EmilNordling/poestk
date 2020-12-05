import styled from 'styled-components';
import { Text, View } from 'one-atom';

export namespace Home {
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

  export const h: FC = function Home() {
    return (
      <elements.content>
        <View.h height="95vh" shrink={false} alignment="center">
          <Text.h1_plus>poestk</Text.h1_plus>
        </View.h>
        <View.h height="95vh" shrink={false}></View.h>
      </elements.content>
    );
  };
}
