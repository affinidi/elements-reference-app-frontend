import { FC } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import AppRouter from 'router/app-router'
import { AuthProvider } from 'contexts/AuthContext'
import { Bootstrap } from 'bootstrap'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <AuthProvider>
        <Bootstrap>
          <AppRouter />
        </Bootstrap>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
