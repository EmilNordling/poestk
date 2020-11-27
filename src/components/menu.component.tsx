import { AnimatePresence, motion } from 'framer-motion';
import { HeadLessPopover, useApplicationState, useService } from 'one-atom';
import { useRef } from 'react';
import styled from 'styled-components';
import { MenuItem, MenuSeparator, MenuService } from '../backend/menu_service';

export namespace Menu {
  export type Props = {
    attachTo: string;
    visible: boolean;
  };

  const elements = {
    popover: styled(motion.ul)<{ xPos: number; yPos: number }>`
      top: ${({ yPos }) => yPos}px;
      left: ${({ xPos }) => xPos}px;
      pointer-events: all;
      position: absolute;
      transform-origin: 50% 0%;
      width: 280px;
      font-size: 0.6875rem; // 11px
      font-weight: 500;
      line-height: 1.2;
      border-radius: 8px;
      padding: 5px;
      background-color: #2b2b2b;
      box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05), 0 4px 10px rgba(0, 0, 0, 0.3);

      li {
        .separator {
          height: 19px;
          display: flex;
          width: 100%;
          position: relative;
          align-items: center;
          padding: 0 10px;

          &::after {
            content: '';
            width: 100%;
            background: #666;
            height: 1px;
          }
        }

        .inner {
          border-radius: 4px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 6px 10px;
          pointer-events: none;
        }

        &.noPointerEvents {
          pointer-events: none;
        }

        &:hover {
          .inner {
            background: #09f;
          }
        }
      }
    `,
  };

  export const h: FC = function Menu() {
    const menuService = useService(MenuService);
    const [state] = useApplicationState(menuService.state);
    const ref = useRef<HTMLUListElement>(null);

    function handleClick(menuItem: MenuItem): void {
      menuItem.click();
      menuService.clearMenu();
    }

    function handleAnimationStart(): void {
      if (ref.current && menuService.state.peekState().menu) {
        ref.current.focus();
      }
    }

    return (
      <AnimatePresence initial={false}>
        {state.menu !== null && (
          <HeadLessPopover.h attachTo={state.menu.attachTo}>
            {({ x, y }) => {
              return (
                <elements.popover
                  ref={ref}
                  xPos={x}
                  yPos={y + 6}
                  tabIndex={0}
                  initial={{ opacity: 0.5, y: -10 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 }, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 }, y: 10 }}
                  onAnimationStart={handleAnimationStart}
                >
                  {state.menu?.builder.map((item) => {
                    if (item instanceof MenuSeparator) {
                      return (
                        <li key={item.key}>
                          <div className="separator"></div>
                        </li>
                      );
                    }

                    return (
                      <li
                        key={item.key}
                        onClick={(): void => {
                          if (item.subMenu && item.subMenu.length > 0) {
                            return;
                          }

                          handleClick(item);
                        }}
                      >
                        <div className="inner">{item.label}</div>
                      </li>
                    );
                  })}
                </elements.popover>
              );
            }}
          </HeadLessPopover.h>
        )}
      </AnimatePresence>
    );
  };
}
