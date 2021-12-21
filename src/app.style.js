import styled, { createGlobalStyle } from "styled-components";
import BG from './assets/imgs/bg_quiz.jpg'


export const GlobalStyle = createGlobalStyle`
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
}

html{
  min-height: 100vh
}

body{
  background-image: url(${BG});
  background-size: cover;
  display:flex;
}

.root{
  width: 100%;
  height: 100vh;
}

`
export const Wrapper = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

 > h1{
  color: #fff;
  font-size: 40px;
  padding: 20px;
 }

 .start, .next {
   cursor: pointer;
   color: #000;
   background: #fff;
   border: 1px solid #fff;
   padding: 10px 20px;
   transition: 0.5s linear;
   border-radius: 10px;
   margin-top: 20px;
   &:hover{
    color: #fff;
    background: rgba(0, 0, 0, 0.5);
    transform: scale(1.15)
   }
   &:active{
     transform: translateY(-10px);
   }
 }

 .score{
  color: #fff;
  padding: 10px;
 }

 > p{
   color:#fff
 }
`

export const SelectWrapper = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 10px;
  display: flex;

  > select {
    border: none;
    cursor: pointer;
    padding: 0 20px;
    &:focus-visible{
      outline: none;
    }
  }

  > option {
    border: none;
  }

  > span {
    color: #fff;
    padding: 10px;
  }

`