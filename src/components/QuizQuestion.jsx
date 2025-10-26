import { QuizContext } from "../store/quiz-app-context";
import { useContext } from "react";
import ProgressBar from "./ProgressBar";

export default function QuizQuestion(){

        const quizContext = useContext(QuizContext);

        function handleSelectAnswer(index=0){
            quizContext.setSelectedAnswerIndex(index);
            console.log(index);
        }

        return(
        <>
        <section id="quiz">
        <div id ="question">
            <ProgressBar />
            <h2>{quizContext.questionOptions[quizContext.currentQuestion].text}</h2>
        </div>
        <ul id="answers">
        {quizContext.questionOptions[quizContext.currentQuestion].answers.map((answer, index) => 
            <li key={index} className="answer" onClick={() => handleSelectAnswer(index)}><button>{answer}</button></li>
            )}
        </ul>
        </section>
        </>
        );
}