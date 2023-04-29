import React from "react";
import uuid from 'react-uuid';

export default function Quiz(){
    const [quiz, setQuiz] = React.useState([])
    const [choice, setChoice] = React.useState([4,4,5,5,5])

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

    function setSelected(e){
        // let iteration = e.target.getAttribute('iterate')
        // let newChoice = e.target.selected
        // if(newChoice != choice[iteration]){
        //     setChoice(prevChoice => {
        //         let temp = []
        //         for(let i=0; i<prevChoice.length; i++){
        //             if(i == iteration){
        //                 temp.push(newChoice)
        //             }else{
        //                 temp.push(prevChoice[i])
        //             }
        //         }
        //         return temp
        //     })
        // }
        // console.log(choice)
        // setChoice(prevChoice => !prevChoice)
    }

    let selectedStyle = {
        backgroundColor: "#D6DBF5",
        border: "none"
    }

    let notSelectedStyle = {
        border: "1px solid #4D5B9E"
    }

    const questions = quiz.map(q => {
        let ansSelections = q.listOfAnswers.map((ans, index) => (
            <div 
                key={uuid()} 
                className="answer"
                style={choice[q.questionNumber] === index ? selectedStyle : notSelectedStyle}
                onClick={() => setSelected(q.questionNumber, index)}
            >{ans}</div>
        ))
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
            <button className="checkAns-btn">Check Answer</button>
        </div>
    )
}