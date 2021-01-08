import { Layout } from 'one-atom';
import { useEffect } from 'react';
import { addDashboardStyle } from '../../modules/add_dashboard_style';

interface Props {}

export const Skeleton: FC<Props> = () => {
  useEffect(() => {
    return addDashboardStyle();
  }, []);

  return (
    <Layout background="var(--global-background)">
      <Layout height={50} shrink={false} background="var(--global-foreground)"></Layout>
      <Layout direction="row">
        <Layout width={278} shrink={false} background="var(--global-foreground)"></Layout>
        <Layout shadow="inset 0px 0px 5px 2px rgb(0 0 0 / 15%), inset 0px 0 1px 1px rgb(0 0 0 / 10%)"></Layout>
        <Layout width={300} shrink={false} background="var(--global-foreground)"></Layout>
      </Layout>
      <Layout height={14} shrink={false} background="var(--global-foreground)"></Layout>
    </Layout>
  );
};
