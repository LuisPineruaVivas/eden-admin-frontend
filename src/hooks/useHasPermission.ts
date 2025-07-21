import useAuth from './useAuth';
import { UserPermission } from '@interface/permissions';

export function useHasPermission(requiredPermissions: UserPermission | UserPermission[]) {
  const { user } = useAuth();

  if (!user || !user.permissions) {
    return false;
  }

  const userPermissions = new Set(user.permissions);
  const permissionsToCheck = Array.isArray(requiredPermissions)
    ? requiredPermissions
    : [requiredPermissions];

  // Verifica si el usuario tiene TODOS los permisos requeridos
  return permissionsToCheck.every(permission => userPermissions.has(permission));
}