import { FC } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from 'router/app-router'
import { Bootstrap } from 'bootstrap'
import { ThemeProvider } from 'styled-components'

import { theme } from 'utils/theme'
import { AuthProvider } from 'contexts/AuthContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <Bootstrap>
              <AppRouter />
            </Bootstrap>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
