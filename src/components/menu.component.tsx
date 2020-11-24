import { AnimatePresence, motion } from 'framer-motion';
import { HeadLessPopover, useApplicationState, useService } from 'one-atom';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { MenuService } from '../backend/menu_service';

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
      font-size: 12px;
      line-height: 1.2;
      border-radius: 10px;
      padding: 6px 0;
      background-color: #2b2b2b;
      box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05), 0 4px 10px rgba(0, 0, 0, 0.3);

      li {
        .inner {
          border-radius: 5px;
          margin: 0 5px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 6px 7px 6px 17px;
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

    function handleClick(callback?: () => void): void {
      if (callback) {
        callback();
      }

      menuService.clearMenu();
    }

    function handleAnimationStart(): void {
      console.log(state.menu);
      if (ref.current && state.menu) {
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
                  exit={{ opacity: 0, transition: { duration: 0.25 } }}
                  onAnimationStart={handleAnimationStart}
                >
                  {state.menu?.builder.map((x) => {
                    return (
                      <li
                        key={x.key}
                        tabIndex={0}
                        onClick={() => {
                          handleClick(x.click);
                        }}
                      >
                        <div className="inner">{x.label}</div>
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
