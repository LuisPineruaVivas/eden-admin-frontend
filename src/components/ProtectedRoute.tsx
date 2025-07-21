import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '@hooks/useAuth'
import { PageSkeleton } from '@components/ui/PageSkeleton'
import { AuthLayout } from '@components/layout/AuthLayout'

export const ProtectedRoute = () => {
  const { isAuthenticated, isValidating } = useAuth()

  // Mientras se valida el token, muestra el esqueleto.
  // Esto evita el parpadeo porque `isAuthenticated` será `true` gracias al token
  // y no se producirá la redirección prematura.
  if (isValidating) {
    return <PageSkeleton />
  }

  // Si después de validar no está autenticado (token inválido), redirige a login.
  // Si está autenticado, muestra el layout con las rutas hijas.
  return isAuthenticated ? <AuthLayout><Outlet /></AuthLayout> : <Navigate to="/login" />
}