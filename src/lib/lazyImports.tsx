import loadable from '@loadable/component'
import { PageSkeleton } from '@components/ui/PageSkeleton'

const createPageLoader = (importFn: () => Promise<{ default: React.ComponentType }>) =>
  loadable(importFn, { fallback: <PageSkeleton />, ssr: false })

const pageMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  
  //Entradas publicas
  login: () => import('@pages/Login/index'),

  //Dashboard Summary
  summary: () => import('@pages/Summary/Index'),
  
  //Modulo de
  managementSummary: () => import('@pages/management/index'),
  managementUserList: () => import('@core/Management/UserList.table'),
  managementPermissionList: () => import('@core/Management/UserPermission.table'),

  //Layouts de errores.
  error401: () => import('@layouts/401'),
  error403: () => import('@layouts/403'),
  error404: () => import('@layouts/404'),
  error500: () => import('@layouts/500'),
}

export const DynamicPage = ({ page }: { page: keyof typeof pageMap }) => {
  const PageComponent = createPageLoader(pageMap[page])
  return <PageComponent />
}

