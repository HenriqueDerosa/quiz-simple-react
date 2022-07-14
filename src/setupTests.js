import '@testing-library/jest-dom'

import { setupServer } from 'msw/node'
import handlers from './utils/handlers'

const mswServer = setupServer(...handlers)

const originalError = console.error

beforeAll(() => {
  mswServer.listen()
  console.error = (...args) => {
    if (
      /Warning: ReactDOM.render is no longer supported in React 18./.test(
        args[0],
      )
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterEach(() => mswServer.resetHandlers())

afterAll(() => {
  console.error = originalError
  mswServer.close()
})
