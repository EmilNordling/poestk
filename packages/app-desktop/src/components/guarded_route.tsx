import React from 'react';
import { use_service } from '@kira/instantiation';
import { KiraPropType } from '@kira/ui-std';
import { Navigate, Routes } from 'react-router';
import { AuthService } from '../backend/services/auth_service';

/**
 * change this
 */
export namespace GuardedRoute {
  export type Props = KiraPropType & {
    redirectTo: string;
    guardedBy: GuardsEnum;
    children: React.ReactNode;
  };

  export enum GuardsEnum {
    Auth,
  }

  export const h: React.FC<Props> = function GuardedRoute({ redirectTo, guardedBy, children }) {
    const authService = use_service(AuthService);

    switch (guardedBy) {
      case GuardsEnum.Auth:
        if (authService.is_authenticated()) break;

        return <Navigate to={redirectTo} />;
      default:
        throw new Error(`noop for "${guardedBy}"`);
    }

    return <Routes>{children}</Routes>;
  };
}
