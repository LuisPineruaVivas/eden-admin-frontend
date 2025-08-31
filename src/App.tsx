import './index.css'

import i18next from 'i18next'
import QueryProvider from '@config/providers/QueryProvider'

import { store } from '@store/index'
import { Provider } from 'react-redux'
import { Toaster } from '@components/ui/Sonner'
import { I18nextProvider } from 'react-i18next'
import { ThemeProvider } from '@config/providers/ThemeProvider'
import { SearchProvider } from '@config/providers/SearchContext'
import { ConfettiProvider } from '@config/providers/ConfettiProvider'
import { ErrorStackIndicator } from '@components/dev/ErrorStackIndicator'
import { ErrorManagerProvider } from '@config/providers/ErrorManagerProvider'
import {BrowserRouter as Router} from 'react-router-dom'
import AppRoutes from '@routes/App.routes'

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

export default App