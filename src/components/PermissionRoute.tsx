import useAuth from '@hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'
import { useHasPermission } from '@hooks/useHasPermission'
import { PageSkeleton } from '@components/ui/PageSkeleton'

interface Props {
  requiredPermission: string
}

export function PermissionRoute({ requiredPermission }: Props) {
  const { isAuthenticated, isValidating } = useAuth()
  const hasPermission = useHasPermission(requiredPermission)

  if (isValidating) return <PageSkeleton />
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!hasPermission) return <Navigate to="/403" replace />

  return <Outlet />
}