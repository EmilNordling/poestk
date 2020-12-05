import { View } from 'one-atom';
import { useEffect } from 'react';
import { addDashboardStyle } from '../../modules/add_dashboard_style';

export namespace SandboxSkeleton {
  export const h: FC = function SandboxSkeleton() {
    useEffect(() => {
      return addDashboardStyle();
    }, []);

    return (
      <View.h background="var(--global-background)">
        <View.h height={50} shrink={false} background="var(--global-foreground)"></View.h>
        <View.h direction="row">
          <View.h width={278} shrink={false} background="var(--global-foreground)"></View.h>
          <View.h shadow="inset 0px 0px 5px 2px rgb(0 0 0 / 15%), inset 0px 0 1px 1px rgb(0 0 0 / 10%)"></View.h>
          <View.h width={300} shrink={false} background="var(--global-foreground)"></View.h>
        </View.h>
        <View.h height={14} shrink={false} background="var(--global-foreground)"></View.h>
      </View.h>
    );
  };
}
