import React, { useState } from 'react';
import { fetchQuiz } from './API';
/* Components */
import QuestionsCards from './components/questionsCards/QuestionsCards';
/* Styles */
import { StyledDiv, StyledButton, StyledTitle, StyledScore, StyledSelect, StyledOption } from './app.style'
/* Types */
import { QuestionState } from './API';

type AnswerObject = {
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
    <StyledDiv>
      <StyledTitle> React TS Made Quiz</StyledTitle>
      {
        gameOver || userAnswers.length === amount ? (
          <>
            <p>Difficulty</p>
            <StyledSelect onChange={hanldeDifficultyOptions}>
              <StyledOption value="easy">Easy</StyledOption>
              <StyledOption value="medium">Medium</StyledOption>
              <StyledOption value="hard">Hard</StyledOption>
            </StyledSelect>
            <p>Amount:</p>
            <StyledSelect onChange={hanldeAmountOptions}>Amount:
              <StyledOption value={10}>10</StyledOption>
              <StyledOption value={15}>15</StyledOption>
              <StyledOption value={20}>20</StyledOption>
            </StyledSelect>
            <p>Category</p>
            <StyledSelect onChange={hanldeCategoryOptions}>Category:
              <StyledOption value={9}>General Knowlodedge</StyledOption>
              <StyledOption value={15}>Video Games</StyledOption>
              <StyledOption value={21}>Sports</StyledOption>
              <StyledOption value={22}>Geography</StyledOption>
              <StyledOption value={23}>History</StyledOption>
              <StyledOption value={27}>Animals</StyledOption>
              <StyledOption value={28}>Vehicles</StyledOption>
            </StyledSelect>
            <p></p>
            <StyledButton onClick={startQuizz}>
              Start
            </StyledButton>
          </>
        ) : null
      }

      {!gameOver ? <StyledScore>Score: {score}</StyledScore> : null}
      {loading && <p>Loading Questions ...</p>}
      {!loading && !gameOver && (<QuestionsCards
        questionNumber={number + 1}
        totalQuestions={amount}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      />)}
      {!gameOver ? <StyledButton onClick={nextQuestion}> Next Question </StyledButton> : null}
    </StyledDiv>
  );
}

export default App;
