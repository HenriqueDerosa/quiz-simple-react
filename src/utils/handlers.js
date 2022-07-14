import { rest } from 'msw'
import { API_URL } from '~/services/requests'

export const mockQuestions = [
  {
    category: 'Games',
    type: 'boolean',
    difficulty: 'hard',
    question: 'What is being tested?',
    correctAnswer: 'True',
    incorrectAnswers: ['False'],
  },
  {
    category: 'Games',
    type: 'boolean',
    difficulty: 'hard',
    question: 'Is the test failing?',
    correctAnswer: 'False',
    incorrectAnswers: ['True'],
  },
]

const handlers = [
  rest.get(`${API_URL}/`, (_, res, context) =>
    res(context.json({ results: mockQuestions })),
  ),
]

export default handlers
