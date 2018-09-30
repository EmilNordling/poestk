import React from 'react';
import { observer } from 'mobx-react';
import ThemeHolder from '../utils/ThemeHolder';

interface ThemeProps {
  border: boolean;
  borderRadius: boolean;
  removeSpacing: boolean;
}

function withTheme<T = any>(Component: any) {
  return (observer((props: T) => {
    return <Component border={ThemeHolder.useBorders} borderRadius={ThemeHolder.useborderRadius} removeSpacing={ThemeHolder.useRemoveSpacing} {...props} />;
  }));
}

export default withTheme;
