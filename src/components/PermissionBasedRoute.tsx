// filepath: src/components/PermissionBasedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useHasPermission } from '@hooks/useHasPermission';
import { UserPermission } from '@interfaces/permission'; // TODO: I don't know what do this, but if you needed I just let stay that code with error

interface Props {
  requiredPermission: UserPermission;
}

export const PermissionBasedRoute = ({ requiredPermission }: Props) => {
  const hasPermission = useHasPermission(requiredPermission);

  return hasPermission ? <Outlet /> : <Navigate to="/403" replace />;
};