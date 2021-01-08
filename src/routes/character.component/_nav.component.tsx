import { Layout, Text, useService } from 'one-atom';
import { AuthService } from '../../application_delegate/auth_service';

interface Props {}

// const elements = {};

export const Nav: FC<Props> = () => {
  const authService = useService(AuthService);

  return (
    <Layout
      width={280}
      background="var(--global-foreground)"
      padding="0 20px"
      alignment="topLeading"
      shadow="1px 0 5px rgb(0 0 0 / 15%), 1px 0 1px rgb(0 0 0 / 10%)"
      shrink={false}
    >
      <Layout alignment="topLeading">{authService.user ? <Text.h3>{authService.user.name}</Text.h3> : <Text.h3>...</Text.h3>}</Layout>
    </Layout>
  );
};
