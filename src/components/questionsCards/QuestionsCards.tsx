import React, { FC } from 'react'
import {Wrapper, WrapperAnswers} from './questionsCards.style'
import { Props } from './model'


const QuestionsCards: FC<Props> = ({question, answers, callback, userAnswer, questionNumber, totalQuestions}) => {
  return (
    <Wrapper>
      <p> Question : {questionNumber} / {totalQuestions}</p>
      <p dangerouslySetInnerHTML={{__html: question}}></p>
      <div>
        {answers.map(answer => (
          <WrapperAnswers 
            key={answer}
            correct={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answer === answer}
            >
            <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
              <span dangerouslySetInnerHTML={{__html: answer}}></span>
            </button>
          </WrapperAnswers>
        ))}
      </div>
    </Wrapper>
  )
}

export default QuestionsCards
