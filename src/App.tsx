import './index.css'
import { Routes, Route, Navigate, BrowserRouter as Router } from 'react-router-dom'
import { DynamicPage } from '@lib/lazyImports'
import { ProtectedRoute } from '@components/ProtectedRoute'
import useAuth from '@hooks/useAuth'
import { PageSkeleton } from '@components/ui/PageSkeleton'

// Importa  proveedores y componentes necesarios
import { Provider } from 'react-redux'
import { store } from '@store/index'
import QueryProvider from '@config/providers/QueryProvider'
import { ThemeProvider } from '@config/providers/ThemeProvider'
import { Toaster } from '@components/ui/Sonner'
import { SearchProvider } from '@config/providers/SearchContext'
import { ConfettiProvider } from '@config/providers/ConfettiProvider'
import { ErrorManagerProvider } from '@config/providers/ErrorManagerProvider'
import { ErrorStackIndicator } from '@components/dev/ErrorStackIndicator'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'

// Este componente contiene la lógica de las rutas y usa los hooks
function AppRoutes() {
  const { isAuthenticated, isValidating } = useAuth()

  if (isValidating) {
    return <PageSkeleton />
  }

  const loginElement = isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <DynamicPage page="login" />
  )

  return (
    <Routes>
      <Route path="/login" element={loginElement} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DynamicPage page="summary" />} />
        <Route path="/management/*" element={<DynamicPage page="management" />} />
        <Route path="/settings/*" element={<DynamicPage page="settings" />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="*" element={<DynamicPage page="error404" />} />
      </Route>
      <Route path="/403" element={<DynamicPage page="error403" />} />
      <Route path="/401" element={<DynamicPage page="error401" />} />
      <Route path="/500" element={<DynamicPage page="error500" />} />
    </Routes>
  )
}

// Este componente envuelve todo en los proveedores de contexto
function App() {
  return (
    <Provider store={store}>
      <Router>
        <QueryProvider>
          <SearchProvider>
            <ConfettiProvider>
              <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
                <ErrorManagerProvider environment='debug'>
                  <I18nextProvider i18n={i18next}>
                    <AppRoutes />
                  </I18nextProvider>
                  <ErrorStackIndicator environment='debug' />
                </ErrorManagerProvider>
                <Toaster 
                
                />
              </ThemeProvider>
            </ConfettiProvider>
          </SearchProvider>
        </QueryProvider>
      </Router>
    </Provider>
  )
}

export default App