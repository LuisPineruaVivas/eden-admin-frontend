// filepath: src/components/PermissionBasedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useHasPermission } from '@/hooks/useHasPermission';
import { UserPermission } from '@/interface/permissions';

interface Props {
  requiredPermission: UserPermission;
}

export const PermissionBasedRoute = ({ requiredPermission }: Props) => {
  const hasPermission = useHasPermission(requiredPermission);

  return hasPermission ? <Outlet /> : <Navigate to="/403" replace />;
};