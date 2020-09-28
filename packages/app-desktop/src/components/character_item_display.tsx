import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { KiraPropType } from '@kira/ui-std';
import { Shimmer } from '@kira/ui';

/**
 * change this
 */
export namespace CharacterItemDisplay {
  export type Props = KiraPropType & {};

  const elements = {
    content: styled.div`
      width: 330px;
      height: 330px;
    `,
    itemContainer: styled.div`
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      grid-column-gap: 10px;
      grid-row-gap: 10px;
      height: 100%;
      width: 100%;

      .helmet {
        grid-area: 1 / 4 / 3 / 6;
      }
      .armour {
        grid-area: 3 / 4 / 6 / 6;
      }
      .belt {
        grid-area: 6 / 4 / 7 / 6;
      }
      .boots {
        grid-area: 5 / 6 / 7 / 8;
      }
      .gloves {
        grid-area: 5 / 2 / 7 / 4;
      }
      .weapon1 {
        grid-area: 1 / 1 / 5 / 3;
      }
      .weapon2 {
        grid-area: 1 / 7 / 5 / 9;
      }
      .ring1 {
        grid-area: 4 / 3 / 5 / 4;
      }
      .ring2 {
        grid-area: 4 / 6 / 5 / 7;
      }
      .amulet {
        grid-area: 3 / 6 / 4 / 7;
      }
      .belts {
        grid-area: 7 / 2 / 9 / 8;
      }
    `,
    item: styled.div`
      background: var(--global-empty-shape);
      border: 1px solid var(--global-divider);
      overflow: hidden;
      border-radius: 4px;
      padding: 1px;
    `,
  };

  const Skeleton: React.FC = function CharacterItemDisplay() {
    return (
      <elements.content>
        <elements.itemContainer>
          <elements.item className='helmet'>
            <Shimmer.h height={71} width={71} />
          </elements.item>
          <elements.item className='armour'>
            <Shimmer.h height={114} width={71} />
          </elements.item>
          <elements.item className='belt'>
            <Shimmer.h height={28} width={71} />
          </elements.item>
          <elements.item className='boots'>
            <Shimmer.h height={71} width={71} />
          </elements.item>
          <elements.item className='gloves'>
            <Shimmer.h height={71} width={71} />
          </elements.item>
          <elements.item className='weapon1'>
            <Shimmer.h height={156} width={71} />
          </elements.item>
          <elements.item className='weapon2'>
            <Shimmer.h height={156} width={71} />
          </elements.item>
          <elements.item className='ring1'>
            <Shimmer.h height={28} width={28} />
          </elements.item>
          <elements.item className='ring2'>
            <Shimmer.h height={28} width={28} />
          </elements.item>
          <elements.item className='amulet'>
            <Shimmer.h height={28} width={28} />
          </elements.item>
          <elements.item className='belts'>
            <Shimmer.h height={71} width={241} />
          </elements.item>
        </elements.itemContainer>
      </elements.content>
    );
  };

  export const h: React.FC<Props> = function CharacterItemDisplay() {
    const [isLoading] = useState(true);

    return (
      <Fragment>
        {isLoading ? (
          <Skeleton />
        ) : (
          <elements.content>
            <elements.itemContainer>
              <elements.item className='helmet'></elements.item>
              <elements.item className='armour'></elements.item>
              <elements.item className='belt'></elements.item>
              <elements.item className='boots'></elements.item>
              <elements.item className='gloves'></elements.item>
              <elements.item className='weapon1'></elements.item>
              <elements.item className='weapon2'></elements.item>
              <elements.item className='ring1'></elements.item>
              <elements.item className='ring2'></elements.item>
              <elements.item className='amulet'></elements.item>
              <elements.item className='belts'></elements.item>
            </elements.itemContainer>
          </elements.content>
        )}
      </Fragment>
    );
  };
}
