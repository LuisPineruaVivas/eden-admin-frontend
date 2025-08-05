import loadable from '@loadable/component'
import { PageSkeleton } from '@/components/ui/PageSkeleton'
import { RouteConfig } from './types'

const Error401 = loadable(() => import('@/layouts/401'), { 
  fallback: <PageSkeleton />, 
  ssr: false 
})
const Error403 = loadable(() => import('@/layouts/403'), { 
  fallback: <PageSkeleton />, 
  ssr: false 
})
const Error404 = loadable(() => import('@/layouts/404'), { 
  fallback: <PageSkeleton />, 
  ssr: false 
})
const Error500 = loadable(() => import('@/layouts/500'), { 
  fallback: <PageSkeleton />, 
  ssr: false 
})

const errorRoutes: RouteConfig[] = [
  { 
    path: '/401', 
    element: <Error401 />,
    meta: { title: 'Unauthorized' }
  },
  { 
    path: '/403', 
    element: <Error403 />,
    meta: { title: 'Forbidden' }
  },
  { 
    path: '/404', 
    element: <Error404 />,
    meta: { title: 'Not Found' }
  },
  { 
    path: '/500', 
    element: <Error500 />,
    meta: { title: 'Server Error' }
  },
  { 
    path: '*', 
    element: <Error404 />,
    meta: { title: 'Not Found' }
  },
]

export default errorRoutes