import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Question from '~/components/question/question'
import routes from '~/utils/routes'
import { useQuestions } from '~/hooks/quiz/quiz-queries'
import { QUESTIONS_AMOUNT } from '~/utils/constants'
import Loading from '~/components/loading/loading'

import styles from './quiz.module.css'

const Quiz = () => {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const { data, isLoading, isError } = useQuestions()
  const [answers, setAnswers] = useState([])

  const handleAnswer = markCorrect => {
    setAnswers(previous => [
      ...previous,
      {
        ...data[current],
        userAnswer: markCorrect,
      },
    ])
    setCurrent(previous =>
      data.length > previous + 1 ? previous + 1 : previous,
    )
  }

  useEffect(() => {
    if (answers.length >= QUESTIONS_AMOUNT) {
      navigate(routes.results, {
        state: { answers },
      })
    }
    if (isError) {
      navigate(routes.home)
    }
  }, [answers.length, isError])

  if (isLoading || !data?.[current]) {
    return <Loading />
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{data[current].category}</h1>
      <div>
        <div className={styles.question}>
          {data.map((item, index) => (
            <Question
              key={item.question}
              data={item}
              index={index}
              isCurrent={index === current}
              handleAnswer={handleAnswer}
            />
          ))}
        </div>
        <p className={styles.counter}>
          {answers.length + 1} of {QUESTIONS_AMOUNT}
        </p>
        <p className={styles.info}>
          Drag to answer <br />← False and True →
        </p>
      </div>
    </main>
  )
}

export default Quiz
