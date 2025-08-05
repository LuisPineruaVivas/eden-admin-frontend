import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { RouteConfig } from '@/routes/types'

import privateRoutes from '@/routes/private.routes'
import publicRoutes from '@/routes/public.routes'
import errorRoutes from '@/routes/error.routes'

export const usePageTitle = () => {
  const location = useLocation()

  const findRouteMeta = (pathname: string, routes: RouteConfig[]): RouteConfig['meta'] | undefined => {
    for (const route of routes) {
      if (route.path === pathname) {
        return route.meta
      }
      
      if (route.children) {
        const childMeta = findRouteMeta(pathname, route.children)
        if (childMeta) return childMeta
      }
    }
    return undefined
  }

  const updatePageTitle = () => {
    const allRoutes = [...privateRoutes, ...publicRoutes, ...errorRoutes]
    const routeMeta = findRouteMeta(location.pathname, allRoutes)
    
    const title = routeMeta?.title || 'Eden Admin'
    
    document.title = title
  }

  useEffect(() => {
    updatePageTitle()
  }, [location.pathname])

  return { updatePageTitle }
} 