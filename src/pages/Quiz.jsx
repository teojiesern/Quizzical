import React from "react";

export default function Quiz(){
    const [quiz, setQuiz] = React.useState([])

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple")
        .then(res => res.json())
        .then(data => setQuiz(data.results))
    },[])
    console.log(quiz)
    const questions = quiz.map((q, index) => {
        let answers = q.incorrect_answers
        answers.push(q.correct_answer)

        function random(){
            let count = 4
            let buttons = []
            for(let i=0; i<4; i++){
                let rand = Math.floor(Math.random()*count)
                buttons.push(<div key={i} className="answer">{answers[rand]}</div>)
                answers.splice(rand,1)
                count--
            }
            return buttons
        }

        return (
            <div key={index} className="question">
                <h1>{q.question}</h1>
                <div className="answer_selections">{random()}</div>
            </div>
        )
    })

    return (
        <div className="questionPage">
            {questions}
        </div>
    )
}