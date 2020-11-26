import { Link } from 'react-router-dom';
import styled from 'styled-components';

export namespace Home {
  const elements = {
    theme: styled.div`
      display: contents;
      --oa-text-h3-size: 1.25rem;
      --oa-text-h3-weight: 700;
    `,
    searchBarTheme: styled.div`
      display: contents;
      color: #666666;
      --oa_separator_bg: #252525;
    `,
  };

  export const h: FC = function Home() {
    return (
      <elements.theme>
        <Link to="./c">to here</Link>
      </elements.theme>
    );
  };
}
