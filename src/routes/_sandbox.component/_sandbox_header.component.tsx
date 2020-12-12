import styled from 'styled-components';
import { Icon } from '../../components/icon.component';
import { OneAtomCommonPropType, Button, AnchorPoint, useService } from 'one-atom';
import { MenuItem, MenuSeparator, MenuService } from '../../backend/menu_service';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export namespace SandboxHeader {
  export interface Props extends OneAtomCommonPropType {}

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

    useEffect(() => {
      return () => {
        menuService.clearMenu();
      };
    }, []);

    function handleClick(): void {
      if (menuService.isOpen()) {
        menuService.clearMenu();
      } else {
        menuService.setMenu({
          attachTo: 'test',
          builder: [
            new MenuItem({
              key: 'char',
              label: 'Go To Characters',
              click() {
                navigate('../');
              },
            }),
            new MenuSeparator({ key: 'sep' }),
            new MenuItem({
              key: 'build',
              label: 'Build',
              subMenu: [
                new MenuItem({
                  key: 'new',
                  label: 'new character',
                }),
                new MenuItem({
                  key: 'open',
                  label: 'open character',
                }),
              ],
            }),
            new MenuItem({
              key: 'edit',
              label: 'Edit',
              subMenu: [
                new MenuItem({
                  key: 'undo',
                  label: 'undo',
                }),
                new MenuItem({
                  key: 'redo',
                  label: 'redo',
                }),
              ],
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
