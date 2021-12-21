import React, { FC } from 'react'
import {StyledWrapper, StyledAnswerSelected, StyledAnswers, StyledNumberQuestion, StyledWrapperAnswers} from './questionsCards.style'

type Props = {
  question: string,
  answers: string[],
  callback: any,
  userAnswer: any,
  questionNumber: number,
  totalQuestions: number
}

const QuestionsCards: FC<Props> = ({question, answers, callback, userAnswer, questionNumber, totalQuestions}) => {
  return (
    <StyledWrapper>
      <StyledNumberQuestion> Question : {questionNumber} / {totalQuestions}</StyledNumberQuestion>
      <p dangerouslySetInnerHTML={{__html: question}}></p>
      <StyledWrapperAnswers>
        {answers.map(answer => (
          <StyledAnswers key={answer}>
            <StyledAnswerSelected disabled={userAnswer} value={answer} onClick={callback}>
              <span dangerouslySetInnerHTML={{__html: answer}}></span>
            </StyledAnswerSelected>
          </StyledAnswers>
        ))}
      </StyledWrapperAnswers>
    </StyledWrapper>
  )
}

export default QuestionsCards
