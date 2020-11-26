import { View, Text } from 'one-atom';

export namespace Nav {
  export const h: FC = function Character_Nav() {
    return (
      <View.h
        width={280}
        background="var(--global-foreground)"
        padding="0 20px"
        alignment="topLeading"
        shadow="1px 0 5px rgb(0 0 0 / 15%), 1px 0 1px rgb(0 0 0 / 10%)"
        shrink={false}
      >
        <View.h alignment="topLeading">
          <Text.h3>test</Text.h3>
        </View.h>
      </View.h>
    );
  };
}
