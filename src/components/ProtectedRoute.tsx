import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '@hooks/useAuth'
import { PageSkeleton } from '@components/ui/PageSkeleton'
import { AuthLayout } from '@components/layout/AuthLayout'
import { useHasPermission } from '@hooks/useHasPermission'

interface Props {
  requiredPermission?: string
}

export const ProtectedRoute = ({ requiredPermission }: Props) => {
  const { isAuthenticated, isValidating } = useAuth()
  const hasPermission = requiredPermission ? useHasPermission(requiredPermission) : true

  if (isValidating) {
    return <PageSkeleton />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!hasPermission) {
    return <Navigate to="/403" replace />
  }

  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  )
}