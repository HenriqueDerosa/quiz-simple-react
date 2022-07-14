import { Link } from 'react-router-dom'

import { QUESTIONS_AMOUNT } from '~/utils/constants'
import routes from '~/utils/routes'

import styles from './home.module.css'

const Home = () => (
  <main className={styles.container}>
    <h1 className={styles.title}>
      <a href="/">React Quiz</a>
    </h1>
    <div>
      <p>
        You will be presented with <b>{QUESTIONS_AMOUNT}</b> True or False
        questions.
      </p>
      <p>Can you score 100%?</p>
    </div>
    <Link to={routes.quiz} className={styles.link}>
      START
    </Link>
  </main>
)

export default Home
