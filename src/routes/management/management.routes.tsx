import { RouteObject } from 'react-router-dom';
import { DynamicPage } from '@lib/lazyImports';
import { ProtectedRoute } from '@components/ProtectedRoute';

export const managementRoutes: RouteObject[] = [
  {
    path: 'management',
    children: [
      {
        index: true,
        element: <DynamicPage page="managementSummary" />
      },
      {
        element: <ProtectedRoute requiredPermission="CAN_SEE_USERS" />,
        children: [
          { path: 'users', element: <DynamicPage page="managementUserList" />},
          { path: 'users/:userId', element: <DynamicPage page="managementUserDetail" /> }
        ]
      },
      {
        element: <ProtectedRoute requiredPermission="CAN_SEE_USERS" />,
        children: [
          { path: 'permissionlist', element: <DynamicPage page="managementPermissionList" /> }
        ]
      },
      

    ]
  }
];