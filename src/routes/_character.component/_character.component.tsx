import { View, Text, useService, VSpacing, Button, HSpacing, BaseInput, Separator } from 'one-atom';
import styled from 'styled-components';
import { Nav } from './_character_nav.component';
import { Icon } from '../../components/icon.component';
import { Category } from './_character_category.component';
import { CharacterController } from './_character.controller';

export namespace Character {
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

  const SearchBar: FC = function Character_SearchBar() {
    return (
      <elements.searchBarTheme>
        <VSpacing.h px={20} />
        <View.h alignment="spaceCenter" direction="row" height={[null]}>
          <View.h alignment="leading" direction="row">
            <Icon.eva_search />
            <HSpacing.h px={10} />
            <BaseInput.h type="text" placeholder="Search 13 Characters" />
          </View.h>
          <div>qwe</div>
        </View.h>
        <VSpacing.h px={10} />
        <Separator.h />
        <VSpacing.h px={10} />
      </elements.searchBarTheme>
    );
  };

  export const h: FC = function Character() {
    const _ = useService(CharacterController);

    return (
      <elements.theme>
        <Nav.h />

        {/* main */}
        <View.h grow padding="0 40px" clip="y" alignment="center">
          {/* main_container */}
          <View.h width={[800]} shrink={false}>
            {/* main_container_header */}
            <View.h height={60} direction="row" padding="60px 0 0" box="outer" alignment="spaceCenter" shrink={false}>
              <Text.h3>Characters</Text.h3>
              <View.h direction="row" width={[null]}>
                <Button.alt label="eee">import</Button.alt>
                <HSpacing.h px={10} />
                <Button.action label="eee">
                  <Icon.eva_plus />
                  <HSpacing.h px={8} />
                  New
                </Button.action>
              </View.h>
            </View.h>

            <SearchBar />

            {/* main_container_header_end */}

            {/* main_container_body */}
            <View.h height={[null]} shrink={false}>
              <Category.h />
            </View.h>
            {/* main_container_body_end */}
          </View.h>
          {/* main_container_end */}
        </View.h>
        {/* main_end */}
      </elements.theme>
    );
  };
}
