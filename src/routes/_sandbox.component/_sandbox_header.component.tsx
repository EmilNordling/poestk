import React from 'react';
import styled from 'styled-components';
import { Icon } from '../../components/icon.component';
import { KiraPropType, Button, AnchorPoint, useService } from 'one-atom';
import { MenuItem, MenuSeparator, MenuService } from '../../backend/menu_service';
import { useNavigate } from 'react-router';

export namespace SandboxHeader {
  export type Props = KiraPropType & Record<string, unknown>;

  const elements = {
    container: styled.header`
      background: var(--global-foreground);
      height: 50px;
      width: 100%;
      flex-shrink: 0;
      align-items: center;
      display: flex;
      padding: 0 14px;
      justify-content: space-between;
    `,
    section: styled.div``,
  };

  export const h: FC<Props> = function SandboxHeader() {
    const menuService = useService(MenuService);
    const navigate = useNavigate();

    function handleClick(): void {
      if (menuService.isOpen()) {
        menuService.clearMenu();
      } else {
        menuService.setMenu({
          attachTo: 'test',
          builder: [
            new MenuItem({
              key: '1',
              label: 'Go To Characters',
              click() {
                navigate('../');
              },
            }),
            new MenuSeparator({ key: '2' }),
            new MenuItem({
              key: '3',
              label: 'Build',
            }),
            new MenuItem({
              key: '4',
              label: 'Edit',
            }),
            new MenuItem({
              key: '5',
              label: 'View',
            }),
          ],
        });
      }
    }

    return (
      <elements.container>
        <elements.section>
          <Button.alt label="a11y_todo" round onClick={handleClick}>
            <AnchorPoint.h name="test" top="-x" left="x-">
              <Icon.eva_menu />
            </AnchorPoint.h>
          </Button.alt>
        </elements.section>
        <elements.section></elements.section>
        <elements.section></elements.section>
      </elements.container>
    );
  };
}
