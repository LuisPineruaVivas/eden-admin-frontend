import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '@hooks/useAuth'
import { Roles } from '@interface/models'

interface RoleBasedRouteProps {
  allowedRoles: Roles[]
}

export const RoleBasedRoute = ({ allowedRoles }: RoleBasedRouteProps) => {
  const { user } = useAuth()

  // Si el rol del usuario está en la lista de roles permitidos, muestra el contenido.
  // De lo contrario, redirige a la página de "Acceso Prohibido" (403).
  return user && allowedRoles.includes(user.role as Roles) ? (
    <Outlet />
  ) : (
    <Navigate to="/403" replace />
  )
}