import { useQuery } from 'react-query'
import { getQuestionsList } from '~/services/questions'

export const useQuestions = options =>
  useQuery(['questions'], getQuestionsList, {
    select: data => data.results,
    ...options,
  })
