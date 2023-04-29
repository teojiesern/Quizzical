import React from "react";
import uuid from 'react-uuid';

export default function Quiz(props){
    let quiz = props.dataset
    const [choice, setChoice] = React.useState(Array(quiz.length).fill(''))
    const [checked, setChecked] = React.useState(false)
    const [correct, setCorrect] = React.useState({})
    const [wrong, setWrong] = React.useState({})
    const [score, setScore] = React.useState(0)

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
    
    function checkAnswer(){
        setCorrect({backgroundColor: "#94D7A2", border: "none"})
        setWrong({backgroundColor: "#F8BCBC", border: "none"})
        setChecked(prevChecked => !prevChecked)
        for(let i=0; i<answers.length; i++){
            if(answers[i] === selections[i]){
                setScore(prevScore => prevScore+1)
            }
        }
    }

    let answers = []
    let selections = Array(choice.length).fill('');
    const questions = quiz.map(q => {
        answers.push(q.correct_answer)
        let ansSelections = q.listOfAnswers.map((ans, index) => {
            if(choice[q.questionNumber] === index){
                selections.splice(q.questionNumber, 1, ans)
            }
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

    function restart(){
        props.restart()
        setChoice(Array(quiz.length).fill('')) 
        setCorrect({})
        setWrong({})
        setScore(0)
        setChecked(false)
    }

    return (
        <div className="questionPage">
            {questions}
            {checked ? 
            <div className="end">
                <h1 className="score">You Scored {score}/{quiz.length} correct answers</h1>
                <button className="check_and_play" onClick={restart}>Play Again</button>
            </div> 
            : <button className="check_and_play" onClick={checkAnswer}>Check Answer</button>}
        </div>
    )
}