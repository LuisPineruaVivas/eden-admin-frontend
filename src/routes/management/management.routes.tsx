import { RouteObject } from 'react-router-dom';
import { DynamicPage } from '@lib/lazyImports';
import { PermissionBasedRoute } from '@components/PermissionBasedRoute';

export const managementRoutes: RouteObject[] = [
  {
    path: 'management',
    children: [
      {
        index: true,
        element: <DynamicPage page="managementSummary" />
      },
      {
        element: <PermissionBasedRoute requiredPermission="CAN_SEE_USERS" />,
        children: [
          { path: 'users', element: <DynamicPage page="managementUserList" />},
          { path: 'users/:userId', element: <DynamicPage page="managementUserDetail" /> }
        ]
      },
      {
        element: <PermissionBasedRoute requiredPermission="CAN_SEE_USERS" />,
        children: [
          { path: 'permissionlist', element: <DynamicPage page="managementPermissionList" /> }
        ]
      },
      

    ]
  }
];