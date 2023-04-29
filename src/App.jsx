import React from "react";
import Quiz from "./pages/Quiz";
import Blobs from "./components/blobs";
import uuid from 'react-uuid';

export default function App(){
  const [start, setStart] = React.useState(false)
  const [dataset, setDataset] = React.useState([])
  const [restart, setRestart] = React.useState(true)

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple")
    .then(res => res.json())
    .then(data => setDataset(
        data.results.map((q, index) => {
            let answers = q.incorrect_answers
            answers.push(q.correct_answer)
            shuffle(answers)
            
            return {
                id:uuid(),
                questionNumber: index,
                listOfAnswers: answers,
                question: q.question,
                correct_answer: q.correct_answer
            }
        })
    ))
    function shuffle(array) {
      let currentIndex = array.length,  randomIndex;
    
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
      return array;
    }
},[restart])

function newGame(){
  setRestart(prevRestart => !prevRestart)
}

  return (
    <div>
      <Blobs />
      {start ? <Quiz dataset={dataset} restart={newGame}/> : 
      <div className="landing-page">
        <h1 className="title">Quizzical</h1>
        <p className="description">Fun Quiz awaits!!!</p>
        <button className="start-btn" onClick={() => setStart(true)}>Start Quiz</button>
      </div>}
    </div>
    
  )
}