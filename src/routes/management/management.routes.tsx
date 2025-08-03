import loadable from '@loadable/component'
import { PageSkeleton } from '@/components/ui/PageSkeleton'
import { RoleBasedRoute } from '@/components/RoleBaseRoute'
import { RouteConfig } from '../types'

const ManagementPage = loadable(() => import('@/pages/Management'), { 
  fallback: <PageSkeleton />, 
  ssr: false 
})
// const UserCreate = loadable(() => import('@/core/Management/UserCreate.form'), {
//   fallback: <PageSkeleton />,
//   ssr: false
// })

const managementRoutes: RouteConfig[] = [
  {
    path: '/management',
    element: <RoleBasedRoute allowedRoles={['Admin', 'Manager', 'Coordinator', 'Analyst']} />, //Revisar los roles que pueden acceder a esta pagina
    meta: {
      title: 'Management'
    },
    children: [
      {
        path: '',
        element: <ManagementPage />,
        meta: {
          title: 'Management Dashboard'
        }
        // children: [
        //   { 
        //     path: '/users', 
        //     element: <PermissionBasedRoute requiredPermission={UserPermission.VIEW_USERS} />,
        //     meta: { title: 'Users' }
        //   },
        //   { 
        //     path: '/users/:id', 
        //     element: <PermissionBasedRoute requiredPermission={UserPermission.EDIT_USERS} />,
        //     meta: { title: 'Edit User' }
        //   },
        // ],
      },
    ],
  },
]

export default managementRoutes