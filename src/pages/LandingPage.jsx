import React from "react";
import Blobs from "../components/blobs";

export default function LandingPage(){
    // move this return statement to main.jsx and use the quiz as a component for each question
    return (
    <div className="landing-page">
        <Blobs />
        <h1 className="title">Quizzical</h1>
        <p className="description">Fun Quiz awaits!!!</p>
        <button className="start-btn">Start Quiz</button>
    </div>
    )
}