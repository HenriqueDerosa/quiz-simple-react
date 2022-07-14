import { motion, useMotionValue, useTransform } from 'framer-motion'
import PropTypes from 'prop-types'

import styles from './question.module.css'

const DRAG_THRESHOLD_TO_ANSWER = 30

const Question = ({ index, data, handleAnswer, isCurrent }) => {
  const x = useMotionValue(0)
  const xInput = [-160, 0, 160]
  const color = useTransform(x, xInput, ['#f26666', '#333', '#88cc88'])
  const rotate = useTransform(x, xInput, [-20, 0, 20])

  const onAnswer = () => {
    if (Math.abs(x.get()) > DRAG_THRESHOLD_TO_ANSWER) {
      const markCorrect = x.get() > 0
      handleAnswer(markCorrect)
    }
  }

  if (!isCurrent) {
    return <div className={styles.container}></div>
  }

  return (
    <div className={styles.container}>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{ opacity: 1 }}
        className={styles.card}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{
          x,
          borderColor: color,
          rotate,
          zIndex: index,
        }}
        onDragEnd={isCurrent && onAnswer}
      >
        <p
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: data.question }}
        />
      </motion.div>
      <div className={styles.placeholder} />
    </div>
  )
}

Question.propTypes = {
  index: PropTypes.number,
  isCurrent: PropTypes.bool,
  data: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correctAnswer: PropTypes.string,
    incorrectAnswers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  handleAnswer: PropTypes.func,
}

Question.defaultProps = {
  isCurrent: false,
  handleAnswer: () => {},
}

export default Question
