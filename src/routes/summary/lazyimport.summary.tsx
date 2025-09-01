import loadable from '@loadable/component'
import { PageSkeleton } from '@components/ui/PageSkeleton'

const createPageLoader = (importFn: () => Promise<{ default: React.ComponentType }>) =>
  loadable(importFn, { fallback: <PageSkeleton />, ssr: false })

/**
 * Dashboard module lazy imports
 * Todas las importaciones dinámicas para el módulo de dashboard
 */
const summaryPageMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {

  summary: () => import('@/pages/Summary/index'),
  
}
  
export const DynamicPage = ({ page }: { page: keyof typeof summaryPageMap }) => {
  const PageComponent = createPageLoader(summaryPageMap[page])
  return <PageComponent />
}
