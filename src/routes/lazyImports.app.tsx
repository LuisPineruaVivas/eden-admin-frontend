import loadable from '@loadable/component'
import { PageSkeleton } from '@components/ui/PageSkeleton'

const createPageLoader = (importFn: () => Promise<{ default: React.ComponentType }>) =>
  loadable(importFn, { fallback: <PageSkeleton />, ssr: false })

const pageMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  
  login: () => import('@pages/Login/index'),

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