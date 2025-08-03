import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense } from 'react'
import privateRoutes from '@/routes/private.routes'
import publicRoutes from '@/routes/public.routes'
import errorRoutes from '@/routes/error.routes'
import { ProtectedRoute } from '@components/ProtectedRoute'
import useAuth from '@/hooks/useAuth'
import { PageSkeleton } from '@/components/ui/PageSkeleton'
import { RouteConfig } from './types'

function renderRoutes(routes: RouteConfig[]) {
  return routes.map(({ path, element, children }, idx) => (
    <Route 
      key={`${path}-${idx}`} 
      path={path} 
      element={
        <Suspense fallback={<PageSkeleton />}>
          {element}
        </Suspense>
      }
    >
      {children && renderRoutes(children)}
    </Route>
  ))
}

export default function AppRoutes() {
  const { isAuthenticated, isValidating } = useAuth()

  if (isValidating) {
    return <PageSkeleton />
  }

  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route element={<ProtectedRoute />}>
            {renderRoutes(privateRoutes)}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
          <Route path="/login" element={<Navigate to="/dashboard" replace />} />
        </>
      ) : (
        <>
          {renderRoutes(publicRoutes)}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
      {renderRoutes(errorRoutes)}
    </Routes>
  )
}