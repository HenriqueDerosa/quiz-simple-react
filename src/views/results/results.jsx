import { useEffect, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import routes from '~/utils/routes'
import { QUESTIONS_AMOUNT } from '~/utils/constants'
import { toBoolean } from '~/utils/helpers'

import styles from './results.module.css'

const Results = () => {
  const navigate = useNavigate()
  const { state } = useLocation()

  useEffect(() => {
    if (!state?.answers) {
      navigate(routes.home)
    }
  }, [state?.answers])

  const correctAnswers = useMemo(
    () =>
      state?.answers?.filter(
        ({ userAnswer, correctAnswer }) =>
          userAnswer === toBoolean(correctAnswer),
      ),
    [state],
  )

  const progressPercent = useMemo(
    () => ({
      background: `linear-gradient(to right, #88cc88 ${
        (correctAnswers?.length / QUESTIONS_AMOUNT) * 100
      }%, transparent ${(correctAnswers?.length / QUESTIONS_AMOUNT) * 100}%)`,
    }),
    [correctAnswers],
  )

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        Your score is {correctAnswers?.length} / {QUESTIONS_AMOUNT}
      </h1>
      <div className={styles['progress-container']}>
        <div className={styles.progress} style={progressPercent} />
      </div>
      <div className={styles.link}>
        <Link to={routes.home}>PLAY AGAIN?</Link>
      </div>
    </main>
  )
}

export default Results
