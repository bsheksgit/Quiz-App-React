import { QuizContext } from "../store/quiz-app-context";
import { useCallback, useContext, useState, useEffect } from "react";

export default function ProgressBar(){

        const quizContext = useContext(QuizContext);
        const [maxValue, setMaxValue] = useState(10000);
        const [progressValue, setProgressValue] = useState(maxValue);

        // Effect for when currentQuestion changes
        useEffect(() => {
            setMaxValue(10000);
            setProgressValue(10000); // reset to full value

            let interval = setInterval(() => {
            setProgressValue((prev) => {
                if (prev <= 0) {
                clearInterval(interval);
                return 0;
                }
                return prev - 50;
            });
            }, 50);
            quizContext.setCurrentQuestion((prevValue) => prevValue+1);

            // cleanup when effect re-runs or component unmounts
            return () => clearInterval(interval);
        }, [quizContext.currentQuestion]);

        // Effect for when selectedAnswerIndex changes
        useEffect(() => {
            if (quizContext.selectedAnswerIndex == -1) return;

            setMaxValue(2000);
            setProgressValue(2000); // reset to full value

            let interval = setInterval(() => {
            setProgressValue((prev) => {
                if (prev <= 0) {
                clearInterval(interval);
                return 0;
                }
                return prev - 50;
            });
            }, 50);

            return () => clearInterval(interval);
        }, [quizContext.selectedAnswerIndex]);

    return (
        <progress 
        id = "question"
        value={progressValue}
        max={maxValue}/>
    );
}