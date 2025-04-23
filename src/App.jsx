import './App.css';
import { useState, useRef, useEffect } from 'react';
import data from './Data/data';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [question, setQuestion] = useState(data[currentIndex]);
  const [stableChoice, setStableChoice] = useState(false);
  const choice1 = useRef(null);
  const choice2 = useRef(null);
  const choice3 = useRef(null);
  const choice4 = useRef(null);
  const arrayChoice = [choice1, choice2, choice3, choice4];
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const [timer, setTimer] = useState(15);
  const [choose, setChoose] = useState(false);

  const handleResult = (e, answer) => {
    if (stableChoice === false) {
      if (question.answer === answer) {
        e.target.classList.add("correct");
        setStableChoice(true);
        setScore((prev) => prev + 500);
        setShowButton(true);
        setChoose(true);
      }
      else {
        e.target.classList.add("incorrect");
        setStableChoice(true);
        arrayChoice[question.answer - 1].current.classList.add("correct");
        setShowButton(true);
        setChoose(true);
      }
    }
  }

  const handleNext = () => {
    if (currentIndex + 1 < data.length) {
      setCurrentIndex((prev) => prev + 1);
      setQuestion(data[currentIndex + 1]);
      setStableChoice(false);
      arrayChoice.map((choice) => {
        choice.current.classList.remove("correct", "incorrect");
      });
      setLevel((prev) => prev + 1);
      setShowButton(false);
      setTimer(15);
      setChoose(false);
    }
  }

  useEffect(() => {
    if (choose || timer === 0)
      return;
    const timeout = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          arrayChoice[question.answer - 1].current.classList.add("incorrect");
          setShowButton(true);
          clearInterval(timeout);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timeout);
  }, [timer, choose]);


  return (
    <div className="page">
      <div className="bigbox">
        <div className="detail">
          <div>{timer}</div>
          <div>{level} of {data.length}</div>
          <div>score:{score}</div>
        </div>
        <hr />
        <span>{currentIndex + 1}. {question.question}</span>
        <div className="choice">
          <div ref={choice1} onClick={(e) => (handleResult(e, 1))}>{question.choice1}</div>
          <div ref={choice2} onClick={(e) => (handleResult(e, 2))}>{question.choice2}</div>
          <div ref={choice3} onClick={(e) => (handleResult(e, 3))}>{question.choice3}</div>
          <div ref={choice4} onClick={(e) => (handleResult(e, 4))}>{question.choice4}</div>
        </div>
        {showButton &&
          <button onClick={handleNext}>Next</button>
        }
      </div>
    </div >
  )
}

export default App

// กดตอบ เวลาต้องหยุด
// มีจอว่าง