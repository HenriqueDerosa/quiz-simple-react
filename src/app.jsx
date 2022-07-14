import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import routes from '~/utils/routes'
import Home from '~/views/home/home'
import Results from '~/views/results/results'
import Quiz from '~/views/quiz/quiz'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
})

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.quiz} element={<Quiz />} />
        <Route path={routes.results} element={<Results />} />
      </Routes>
    </BrowserRouter>
    {process.env.NODE_ENV === 'development' && (
      <ReactQueryDevtools position="bottom-right" />
    )}
  </QueryClientProvider>
)

export default App
