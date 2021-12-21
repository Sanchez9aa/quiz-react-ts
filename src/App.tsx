import React, { useState } from 'react';
import { fetchQuiz } from './API';
/* Components */
import QuestionsCards from './components/questionsCards/QuestionsCards';
/* Styles */
import { GlobalStyle, Wrapper, SelectWrapper } from './app.style'
/* Types */
import { QuestionState } from './API';

export type AnswerObject = {
  question: string,
  answer: string,
  correct: boolean,
  correctAnswer: string
}

const App = () => {

  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)
  const [amount, setAmount] = useState<number>(10)
  const [category, setCategory] = useState<number>(21)
  const [difficulty, setDifficulty] = useState<string>("easy")

  const startQuizz = async () => {
    setLoading(true)
    setGameOver(false)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    const newQuestions = await fetchQuiz(amount, difficulty, category)
    setQuestions(newQuestions)
    setLoading(false)
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1

    if (nextQuestion === amount) {
      setGameOver(true)
      setAmount(10)
      setCategory(21)
      setDifficulty("easy")
    } else {
      setNumber(nextQuestion)
    }
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // Get user Answer
      const answer = e.currentTarget.value
      //Check answer against correct answer
      const checkAnswer = questions[number].correct_answer === answer
      //Score if answer is correct
      if (checkAnswer) setScore(prev => prev + 1)
      // Save answer in the array of user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct: checkAnswer,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers(prev => [...prev, answerObject])
    }
  }
  console.log(amount)
  console.log(category)

  const hanldeAmountOptions = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setAmount(Number(e.target.value))
  }

  const hanldeCategoryOptions = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setCategory(Number(e.target.value))
  }

  const hanldeDifficultyOptions = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setDifficulty(e.target.value)
  }


  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1> React TS Made Quiz</h1>
        {
          gameOver || userAnswers.length === amount ? (
            <>
              <SelectWrapper>
                <span>Difficulty</span>
                <select onChange={hanldeDifficultyOptions}>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </SelectWrapper>
              <SelectWrapper>
                <span>Amount:</span>
                <select onChange={hanldeAmountOptions}>Amount:
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
              </SelectWrapper>
              <SelectWrapper>
                <span>Category</span>
                <select onChange={hanldeCategoryOptions}>Category:
                  <option value={9}>General Knowlodedge</option>
                  <option value={15}>Video Games</option>
                  <option value={21}>Sports</option>
                  <option value={22}>Geography</option>
                  <option value={23}>History</option>
                  <option value={27}>Animals</option>
                  <option value={28}>Vehicles</option>
                </select>
              </SelectWrapper>
              <p></p>
              <button className='start' onClick={startQuizz}>
                Start
              </button>
            </>
          ) : null
        }

        {!gameOver ? <p className='score'>Score: {score}</p> : null}
        {loading && <p>Loading Questions ...</p>}
        {!loading && !gameOver && (<QuestionsCards
          questionNumber={number + 1}
          totalQuestions={amount}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />)}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== amount - 1 ? <button className='next' onClick={nextQuestion}> Next Question </button> : null}
      </Wrapper>
    </>
  );
}

export default App;
