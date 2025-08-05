import './index.css'
import React from 'react'
import { Navigate, BrowserRouter as Router, useRoutes } from 'react-router-dom'
import { DynamicPage } from '@lib/lazyImports'
import { ProtectedRoute } from '@components/ProtectedRoute'
import useAuth from '@hooks/useAuth'
import { PageSkeleton } from '@components/ui/PageSkeleton'

import { Provider } from 'react-redux'
import { store } from '@store/index'
import QueryProvider from '@config/providers/QueryProvider'
import { ThemeProvider } from '@config/providers/ThemeProvider'
import { Toaster } from '@components/ui/Sonner'
import { Toaster } from '@components/ui/Sonner'
import { SearchProvider } from '@config/providers/SearchContext'
import { ConfettiProvider } from '@config/providers/ConfettiProvider'
import { ErrorManagerProvider } from '@config/providers/ErrorManagerProvider'
import { ErrorStackIndicator } from '@components/dev/ErrorStackIndicator'
import { I18nextProvider } from 'react-i18next'
import AppRoutes from '@/routes/App.routes'
import i18next from 'i18next'

// Import your modules routes
import { managementRoutes } from '@routes/management/management.routes'

function AppRoutes() {
  const { isAuthenticated, isValidating } = useAuth();

  const loginElement = isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <DynamicPage page="login" />
  );

  // Siempre llamamos a useRoutes, sin condicionar su invocación
  const routes = useRoutes([
    { path: '/login', element: loginElement },
    {
      element: <ProtectedRoute />,
      children: [
        { path: 'dashboard', element: <DynamicPage page="summary" /> },
        ...managementRoutes,
        { path: '/', element: <Navigate to="/dashboard" replace /> },
        { path: '*', element: <DynamicPage page="error404" /> }
      ]
    },
    { path: '/403', element: <DynamicPage page="error403" /> },
    { path: '/401', element: <DynamicPage page="error401" /> },
    { path: '/500', element: <DynamicPage page="error500" /> }
  ]);

  // Condicionalmente renderizamos el skeleton, pero ya se llamaron todos los Hooks
  return isValidating ? <PageSkeleton /> : routes;
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <QueryProvider>
          <SearchProvider>
            <ConfettiProvider>
              <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <ErrorManagerProvider environment="debug">
                  <I18nextProvider i18n={i18next}>
                    <PageTitleHandler />
                    <AppRoutes />
                  </I18nextProvider>
                  <ErrorStackIndicator environment="debug" />
                </ErrorManagerProvider>
                <Toaster />
                <Toaster />
              </ThemeProvider>
            </ConfettiProvider>
          </SearchProvider>
        </QueryProvider>
      </Router>
    </Provider>
  )
}

export default App