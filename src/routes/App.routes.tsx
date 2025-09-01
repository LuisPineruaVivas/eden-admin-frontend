import { managementRoutes } from '@routes/management/management.routes'
import { dashboardRoutes } from '@/routes/summary/summary.routes'
import { PageSkeleton } from '@/components/ui/PageSkeleton';
import { DynamicPage } from '@/routes/lazyImports.app';
import { Navigate, useRoutes } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import useAuth from '@/hooks/useAuth';

function AppRoutes() {
  const { isAuthenticated, isValidating } = useAuth();

  const loginElement = isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <DynamicPage page="login" />
  );

  const routes = useRoutes([
    { path: '/login', element: loginElement },
    {
      element: <ProtectedRoute />,
      children: [
        ...dashboardRoutes,
        ...managementRoutes,
        { path: '/', element: <Navigate to="/dashboard" replace /> },
        { path: '*', element: <DynamicPage page="error404" /> }
      ]
    },
    { path: '/403', element: <DynamicPage page="error403" /> },
    { path: '/401', element: <DynamicPage page="error401" /> },
    { path: '/500', element: <DynamicPage page="error500" /> }
  ]);

  return isValidating ? <PageSkeleton /> : routes;
}   

export default AppRoutes;