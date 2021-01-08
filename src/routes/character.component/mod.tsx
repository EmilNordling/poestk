import { Layout, Text, Button, HSpacing } from 'one-atom';
import styled from 'styled-components';
import { Nav } from './_nav.component';
import { Icon } from '../../components/icon.component';
import { Category } from './_category.component';
import { useEffect } from 'react';
import { addDashboardStyle } from '../../modules/add_dashboard_style';

interface Props {}

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

// const SearchBar: FC = function Character_SearchBar() {
//   return (
//     <elements.searchBarTheme>
//       <VSpacing px={20} />
//       <Layout alignment="spaceCenter" direction="row" height={[null]}>
//         <Layout alignment="leading" direction="row">
//           <Icon.eva_search />
//           <HSpacing px={10} />
//           <BaseInput.h type="text" placeholder="Search 13 Characters" />
//         </Layout>
//         <div>qwe</div>
//       </Layout>
//       <VSpacing px={10} />
//       <Separator />
//       <VSpacing px={10} />
//     </elements.searchBarTheme>
//   );
// };

export const Character: FC<Props> = () => {
  useEffect(() => {
    return addDashboardStyle();
  }, []);

  return (
    <elements.theme>
      <Nav />

      <Layout grow padding="0 40px" clip="y" alignment="center">
        <Layout width={[800]} shrink={false}>
          <Layout height={60} direction="row" padding="60px 0 0" box="outer" alignment="spaceCenter" shrink={false}>
            <Text.h3>Characters</Text.h3>
            <Layout direction="row" width={[null]}>
              <Button.alt label="eee">import</Button.alt>
              <HSpacing px={10} />
              <Button.action label="eee">
                <Icon.eva_plus />
                <HSpacing px={8} />
                New
              </Button.action>
            </Layout>
          </Layout>

          <Layout height={[null]} shrink={false}>
            <Category />
          </Layout>
        </Layout>
      </Layout>
    </elements.theme>
  );
};
