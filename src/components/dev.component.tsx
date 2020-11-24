import { View, Text, useService } from 'one-atom';
import React, { FC, Fragment } from 'react';
import styled from 'styled-components';
import { ApplicationService } from '../backend/application_service';

export namespace Dev {
  const elements = {
    theme: styled.div`
      display: contents;
      --kira-text-h3-size: 0.9rem;
      --kira-text-h3-weight: 700;
      --kira-text-h3-line-height: 0.9rem;
    `,
    searchBarTheme: styled.div`
      display: contents;
      color: #666666;
      --kira_separator_bg: #252525;
    `,
    center: styled.div`
      flex: 1;
      padding: 20px;
      display: flex;
      height: 100%;
    `,
    inner: styled.div`
      display: flex;
      height: 100%;
      width: 100%;
      box-shadow: 0px 0 15px 10px rgb(0 0 0 / 15%);
    `,
  };

  export const h: FC = function Home({ children }) {
    const applicationService = useService(ApplicationService);

    if (process.env.NODE_ENV === 'development' && applicationService.debug) {
      return (
        <View.h alignment="topLeading">
          <elements.theme>
            <View.h height={40} background="var(--global-foreground)" shadow="0 1px 5px rgb(0 0 0 / 15%), 0 1px 1px rgb(0 0 0 / 10%)">
              <Text.h3>Desktop</Text.h3>
            </View.h>
          </elements.theme>
          <View.h direction="row" alignment="topLeading">
            <elements.theme>
              <View.h
                width={200}
                background="var(--global-foreground)"
                padding="10px"
                alignment="topLeading"
                shadow="1px 0 5px rgb(0 0 0 / 15%), 1px 0 1px rgb(0 0 0 / 10%)"
                shrink={false}
              >
                <View.h alignment="topLeading">
                  <Text.h3>State</Text.h3>
                </View.h>
              </View.h>
            </elements.theme>

            <elements.center>
              <elements.inner>{children}</elements.inner>
            </elements.center>

            <elements.theme>
              <View.h
                width={200}
                background="var(--global-foreground)"
                padding="10px"
                alignment="topLeading"
                shadow="-1px 0 5px rgb(0 0 0 / 15%), -1px 0 1px rgb(0 0 0 / 10%)"
                shrink={false}
              >
                <View.h alignment="topLeading">
                  <Text.h3>Theme</Text.h3>
                </View.h>
              </View.h>
            </elements.theme>
          </View.h>
        </View.h>
      );
    }

    return <Fragment>{children}</Fragment>;
  };
}
