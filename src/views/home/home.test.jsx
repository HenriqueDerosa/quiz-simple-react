import { render, screen } from '@testing-library/react'
import Home from './home'

jest.mock('react-router-dom', () => ({
  Link: ({ children }) => children,
}))

test('Home to be rendered', () => {
  render(<Home />)

  expect(screen.getByText(/React Quiz/i)).toBeInTheDocument()
  expect(screen.getByText(/Start/i)).toBeInTheDocument()
})
