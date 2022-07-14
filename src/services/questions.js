import { QUESTIONS_AMOUNT } from '~/utils/constants'
import service from './requests'

export const getQuestionsList = async () => {
  const response = await service.get('/', {
    params: {
      amount: QUESTIONS_AMOUNT,
      difficulty: 'easy',
      type: 'boolean',
    },
  })

  return response.data
}
