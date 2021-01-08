import { Fragment, useState } from 'react';
import styled from 'styled-components';
import { OneAtomCommonPropType, Shimmer } from 'one-atom';

interface Props extends OneAtomCommonPropType {}

const elements = {
  content: styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
  `,
  itemContainer: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    width: 230px;
    height: 230px;

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
    box-shadow: 0 0 2px 0px var(--rare);
    overflow: hidden;
    border-radius: 4px;
    padding: 1px;

    &:hover {
      filter: brightness(120%) hue-rotate(2deg);
    }
  `,
  itemLoading: styled.div`
    background: var(--global-empty-shape);
    border: 1px solid var(--global-divider);
    overflow: hidden;
    border-radius: 4px;
    padding: 1px;
  `,
};

const Skeleton: FC = function CharacterItemDisplay_Skeleton() {
  return (
    <elements.content>
      <elements.itemContainer>
        <elements.itemLoading className="helmet">
          <Shimmer height={71} width={71} />
        </elements.itemLoading>
        <elements.itemLoading className="armour">
          <Shimmer height={114} width={71} />
        </elements.itemLoading>
        <elements.itemLoading className="belt">
          <Shimmer height={28} width={71} />
        </elements.itemLoading>
        <elements.itemLoading className="boots">
          <Shimmer height={71} width={71} />
        </elements.itemLoading>
        <elements.itemLoading className="gloves">
          <Shimmer height={71} width={71} />
        </elements.itemLoading>
        <elements.itemLoading className="weapon1">
          <Shimmer height={156} width={71} />
        </elements.itemLoading>
        <elements.itemLoading className="weapon2">
          <Shimmer height={156} width={71} />
        </elements.itemLoading>
        <elements.itemLoading className="ring1">
          <Shimmer height={28} width={28} />
        </elements.itemLoading>
        <elements.itemLoading className="ring2">
          <Shimmer height={28} width={28} />
        </elements.itemLoading>
        <elements.itemLoading className="amulet">
          <Shimmer height={28} width={28} />
        </elements.itemLoading>
        <elements.itemLoading className="belts">
          <Shimmer height={71} width={241} />
        </elements.itemLoading>
      </elements.itemContainer>
    </elements.content>
  );
};

export const CharacterItemDisplay: FC<Props> = () => {
  const [isLoading] = useState(false);

  return (
    <Fragment>
      {isLoading ? (
        <Skeleton />
      ) : (
        <elements.content>
          <elements.itemContainer>
            <elements.item className="helmet"></elements.item>
            <elements.item className="armour"></elements.item>
            <elements.item className="belt"></elements.item>
            <elements.item className="boots"></elements.item>
            <elements.item className="gloves"></elements.item>
            <elements.item className="weapon1"></elements.item>
            <elements.item className="weapon2"></elements.item>
            <elements.item className="ring1"></elements.item>
            <elements.item className="ring2"></elements.item>
            <elements.item className="amulet"></elements.item>
            <elements.item className="belts"></elements.item>
          </elements.itemContainer>
        </elements.content>
      )}
    </Fragment>
  );
};
