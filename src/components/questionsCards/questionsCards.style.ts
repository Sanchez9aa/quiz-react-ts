import styled from "styled-components";
import { ButtonWrapperProps } from './model'

export const Wrapper = styled.div`
max-width : 1100px;


> p {
  color:#fff;
  margin: 10px 0;
}

.question{
    display:flex;
    justify-content: center;
  }

@media screen and (max-width: 620px){
  width: 90%;
}
`

export const WrapperAnswers = styled.div<ButtonWrapperProps>`
  transition: all 0.4s ease-in;

  :hover{
    opacity: 0.5;
    transform: scale(1.05)
  }

  button{ 
    cursor: pointer;
    user-select: none;
    width: 100%;
    height: 40px;
    margin: 10px 0;
    background: ${({ correct, userClicked }) =>
    correct
      ? 'linear-gradient(90deg, #56ffa4, #59bc86)'
      : !correct && userClicked
        ? 'linear-gradient(90deg, #ff5656, #c16868)'
        : 'rgba(0, 0, 0, 0.2)'};
    border: 3px solid #fff;
    box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    color:#fff;
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25)
  }
`



