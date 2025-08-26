import './index.css'

import i18next from 'i18next'
import useAuth from '@hooks/useAuth'
import QueryProvider from '@config/providers/QueryProvider'

import { store } from '@store/index'
import { Provider } from 'react-redux'
import { DynamicPage } from '@lib/lazyImports'
import { Toaster } from '@components/ui/Sonner'
import { I18nextProvider } from 'react-i18next'
import { PageSkeleton } from '@components/ui/PageSkeleton'
import { ProtectedRoute } from '@components/ProtectedRoute'
import { ThemeProvider } from '@config/providers/ThemeProvider'
import { SearchProvider } from '@config/providers/SearchContext'
import { ConfettiProvider } from '@config/providers/ConfettiProvider'
import { ErrorStackIndicator } from '@components/dev/ErrorStackIndicator'
import { ErrorManagerProvider } from '@config/providers/ErrorManagerProvider'
import { Navigate, BrowserRouter as Router, useRoutes } from 'react-router-dom'
import { managementRoutes } from '@routes/management/management.routes'

function AppRoutes() {
  const { isAuthenticated, isValidating } = useAuth();

  const loginElement = isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <DynamicPage page="login" />
  );

  // Solo un ProtectedRoute para el layout y autenticación
  const routes = useRoutes([
    { path: '/login', element: loginElement },
    {
      element: <ProtectedRoute />, // Aquí va el layout y el guardia de autenticación
      children: [
        { path: 'dashboard', element: <DynamicPage page="summary" /> },
        ...managementRoutes, // Las rutas hijas usan PermissionRoute solo para permisos, sin layout
        { path: '/', element: <Navigate to="/dashboard" replace /> },
        { path: '*', element: <DynamicPage page="error404" /> }
      ]
    },
    { path: '/403', element: <DynamicPage page="error403" /> },
    { path: '/401', element: <DynamicPage page="error401" /> },
    { path: '/500', element: <DynamicPage page="error500" /> }
  ]);

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
                    {/* <PageTitleHandler /> */}
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

export default App;