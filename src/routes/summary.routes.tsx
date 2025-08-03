import loadable from '@loadable/component'
import { PageSkeleton } from '@/components/ui/PageSkeleton'
import { RouteConfig } from './types'

const SummaryPage = loadable(() => import('@/pages/Summary'), { 
  fallback: <PageSkeleton />, 
  ssr: false 
})

const summaryRoutes: RouteConfig[] = [
  { 
    path: '/dashboard', 
    element: <SummaryPage />,
    meta: {
      title: 'Dashboard'
    }
  },
]

export default summaryRoutes