import React from "react";
import uuid from 'react-uuid';

export default function Quiz(){
    const [quiz, setQuiz] = React.useState([])
    const [choice, setChoice] = React.useState([4,4,4,4,4])
    const [checked, setChecked] = React.useState(false)

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple")
        .then(res => res.json())
        .then(data => setQuiz(
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
    },[])

    function setSelected(questionNum, index){
        const temp = []
        if(choice[questionNum] != index){
            for(let i=0; i<choice.length; i++){
                i === questionNum ? temp.push(index) : temp.push(choice[i])
            }
        }
        setChoice(temp)
    }

    let selectedStyle = {
        backgroundColor: "#D6DBF5",
        border: "none"
    }

    let notSelectedStyle = {
        border: "1px solid #4D5B9E"
    }

    let correct = {}

    let wrong = {}

    function checkAnswer(){
        correct = {backgroundColor: "#94D7A2", border: "none"}
        wrong = {backgroundColor: "#F8BCBC", border: "none"}
        setChoice([4,4,4,4,4])
        setChecked(prevChecked => !prevChecked)
    }

    const questions = quiz.map(q => {
        let ansSelections = q.listOfAnswers.map((ans, index) => {
            return (
                <div 
                    key={uuid()} 
                    className={"answer"}
                    style={Object.assign(
                        {},
                        choice[q.questionNumber] === index ? selectedStyle : notSelectedStyle,
                        q.correct_answer === ans ? correct : (choice[q.questionNumber] === index ? wrong : notSelectedStyle)
                        )}
                    onClick={() => setSelected(q.questionNumber, index)}
                >{ans}
                </div>
            )
        })
        return (
            <div key={q.id} className="question">
                <h1 className="question_title">{q.question}</h1>
                <div className="answer_selections">{ansSelections}</div>
            </div>
        )
    })

    return (
        <div className="questionPage">
            {questions}
            <button className="checkAns-btn" onClick={checkAnswer}>Check Answer</button>
        </div>
    )
}