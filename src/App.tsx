import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'

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
import AppRoutes from '@/routes/App.routes'
import i18next from 'i18next'
import { usePageTitle } from '@/hooks/usePageTitle'

const PageTitleHandler = () => {
  usePageTitle()
  return null
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
                    <PageTitleHandler />
                    <AppRoutes />
                  </I18nextProvider>
                  <ErrorStackIndicator environment='debug' />
                </ErrorManagerProvider>
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