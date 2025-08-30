import { RouteObject } from 'react-router-dom';
import { DynamicPage } from '@lib/lazyImports';
import { PermissionRoute } from '@components/PermissionRoute';

export const managementRoutes: RouteObject[] = [
  {
    path: 'management',
    children: [
      {
        index: true,
        element: <DynamicPage page="managementSummary" />
      },
      {
        element: <PermissionRoute requiredPermission="CAN_SEE_USERS" />,
        children: [
          { path: 'users', element: <DynamicPage page="managementUserList" />}
        ]
      },
      {
        element: <PermissionRoute requiredPermission="CAN_SEE_USERS" />,
        children: [
          { path: 'permissionlist', element: <DynamicPage page="managementPermissionList" /> }
        ]
      },
      

    ]
  }
];