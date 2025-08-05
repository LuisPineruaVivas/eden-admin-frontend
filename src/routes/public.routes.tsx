import loadable from '@loadable/component'
import { PageSkeleton } from '@/components/ui/PageSkeleton'
import { Navigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import { RouteConfig } from './types'

const LoginPage = loadable(() => import('@/pages/Login'), { 
  fallback: <PageSkeleton />, 
  ssr: false 
})

const LoginRouteWrapper = () => {
  const { isAuthenticated } = useAuth()
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }
  
  return <LoginPage />
}

const publicRoutes: RouteConfig[] = [
  {
    path: '/login',
    element: <LoginRouteWrapper />,
    meta: {
      title: 'Login'
    }
  },
  // Add more public routes here 
]

export default publicRoutes 