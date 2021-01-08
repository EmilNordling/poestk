import { Layout, Text, useService } from 'one-atom';
import { StrictMode } from 'react';
import styled from 'styled-components';
import { ApplicationService } from '../application_delegate/application_service';

interface Props {}

const elements = {
  theme: styled.div`
    display: contents;
    --oa-text-h3-size: 0.9rem;
    --oa-text-h3-weight: 700;
    --oa-text-h3-line-height: 0.9rem;
  `,
  searchBarTheme: styled.div`
    display: contents;
    color: #666666;
    --oa_separator_bg: #252525;
  `,
  header: styled.div`
    height: 40px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: var(--global-foreground);
    box-shadow: 0 1px 5px rgb(0 0 0 / 15%), 0 1px 1px rgb(0 0 0 / 10%);
  `,
  asideWrapper: styled.div`
    width: 200px;
  `,
  aside: styled.div<{ alignment: 'left' | 'right' }>`
    position: fixed;
    z-index: 1;
    top: 40px;
    ${({ alignment }) => {
      if (alignment === 'left') {
        return 'left: 0;';
      }

      return 'right: 0;';
    }}
    height: calc(100vh - 40px);
    width: inherit;
    background: var(--global-foreground);
    padding: 10px;
    box-shadow: 1px 0 5px rgb(0 0 0 / 15%), 1px 0 1px rgb(0 0 0 / 10%);
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
    border-radius: 10px;
    overflow: hidden;
  `,
};

export const Dev: FC<Props> = ({ children }) => {
  const applicationService = useService(ApplicationService);

  if (process.env.NODE_ENV === 'development' && applicationService.debug) {
    return (
      <Layout alignment="topLeading" padding="40px 0 0 0">
        <elements.theme>
          <elements.header>
            <Text.h3>Desktop</Text.h3>
          </elements.header>
        </elements.theme>
        <Layout direction="row" alignment="topLeading">
          <elements.theme>
            <elements.asideWrapper>
              <elements.aside alignment="left">
                <Layout alignment="topLeading">
                  <Text.h3>State</Text.h3>
                </Layout>
              </elements.aside>
            </elements.asideWrapper>
          </elements.theme>

          <elements.center>
            <elements.inner>
              <StrictMode>{children}</StrictMode>
            </elements.inner>
          </elements.center>

          <elements.theme>
            <elements.asideWrapper>
              <elements.aside alignment="right">
                <Layout alignment="topLeading">
                  <Text.h3>Theme</Text.h3>
                </Layout>
              </elements.aside>
            </elements.asideWrapper>
          </elements.theme>
        </Layout>
      </Layout>
    );
  }

  return <StrictMode>{children}</StrictMode>;
};
