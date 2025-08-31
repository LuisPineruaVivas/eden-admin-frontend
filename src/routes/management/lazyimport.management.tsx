import loadable from '@loadable/component'
import { PageSkeleton } from '@components/ui/PageSkeleton'

const createPageLoader = (importFn: () => Promise<{ default: React.ComponentType }>) =>
  loadable(importFn, { fallback: <PageSkeleton />, ssr: true })

/**
 * Management module lazy imports
 * Todas las importaciones dinámicas para el módulo de management
 */
const managementPageMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {

  managementSummary: () => import('@/pages/Management/index'),
  
  managementUserList: () => import('@/core/Management/UserList.table'),

  managementPermissionList: () => import('@/core/Management/UserPermission.table'),
  
  managementGroupList: () => import('@/core/Management/GroupList.table'),
}

export const DynamicPage = ({ page }: { page: keyof typeof managementPageMap }) => {
  const PageComponent = createPageLoader(managementPageMap[page])
  return <PageComponent />
}
