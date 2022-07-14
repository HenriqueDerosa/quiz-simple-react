import { render, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { QueryClientProvider } from 'react-query'
import { useQuestions } from '~/hooks/quiz/quiz-queries'

import Quiz from './quiz'
import { queryClient } from '~/app'
import { mockQuestions } from '~/utils/handlers'

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}))

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('quiz page', () => {
  it('should display question', async () => {
    render(<Quiz />, {
      wrapper,
    })

    expect(screen.getByText(/loading/i)).toBeTruthy()

    const { result, waitFor } = renderHook(() => useQuestions(), { wrapper })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data).toHaveLength(mockQuestions.length)
  })
})
