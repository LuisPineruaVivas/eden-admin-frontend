import { RouteObject } from 'react-router-dom';
import { DynamicPage } from './lazyimport.summary';

/**
 * Dashboard routes configuration
 * Rutas del módulo de dashboard con sus respectivos permisos
 */
export const dashboardRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    children: [
      {
        index: true,
        element: <DynamicPage page="summary" />,
      }
    ]
  }
];