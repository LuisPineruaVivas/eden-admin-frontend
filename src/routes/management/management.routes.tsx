import { Routes, Route } from 'react-router-dom';
import { DynamicPage } from '@/lib/lazyImports';
import { PermissionBasedRoute } from '@/components/PermissionBasedRoute';
import { UserPermission } from '@/interface/permissions';

export default function ManagementModulePage() {
  return (
    <Routes>
      {/* Dashboard del módulo */}
      <Route index element={<DynamicPage page="managementDashboard" />} />

      {/* Rutas de usuarios */}
      <Route element={<PermissionBasedRoute requiredPermission={UserPermission.VIEW_USERS} />}>
        <Route path="users" element={<DynamicPage page="managementUserList" />} />
        <Route path="users/:userId" element={<DynamicPage page="managementUserDetail" />} />
      </Route>

      <Route element={<PermissionBasedRoute requiredPermission={UserPermission.CREATE_USER} />}>
        <Route path="users/create" element={<DynamicPage page="managementUserCreate" />} />
      </Route>

      <Route element={<PermissionBasedRoute requiredPermission={UserPermission.EDIT_USER} />}>
        <Route path="users/:userId/edit" element={<DynamicPage page="managementUserEdit" />} />
      </Route>
    </Routes>
  );
}