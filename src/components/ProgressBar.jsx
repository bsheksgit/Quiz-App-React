import { QuizContext } from "../store/quiz-app-context";
import { useCallback, useContext, useState, useEffect, useRef } from "react";

export default function ProgressBar(){

        const quizContext = useContext(QuizContext);
        const [maxValue, setMaxValue] = useState(10000);
        const [progressValue, setProgressValue] = useState(maxValue);

        const tenSecTimerRef = useRef();
        const twoSecTimerRef = useRef();

        // Effect for when currentQuestion changes
        useEffect(() => {
        setMaxValue(10000);
        setProgressValue(10000);
        quizContext.setProgressBarCssClass(undefined);

        tenSecTimerRef.current = setInterval(() => {
            setProgressValue((prev) => {
            if (prev <= 0) {
                clearInterval(tenSecTimerRef.current);
                quizContext.setCurrentQuestion(
                (prevValue) => (prevValue < 6 ? prevValue + 1 : 0)
                );
                return 0;
            }
            return prev - 50;
            });
        }, 50);

        return () => clearInterval(tenSecTimerRef.current);
        }, [quizContext.currentQuestion]);


        // Effect for when selectedAnswerIndex changes

        useEffect(() => {
        if (quizContext.selectedAnswerIndex == -1) return;

        // Clear 10-second timer as you’ve already done
        clearInterval(tenSecTimerRef.current);

        setMaxValue(2000);
        setProgressValue(2000);

        twoSecTimerRef.current = setInterval(async () => {
            setProgressValue((prev) => {
            if (prev <= 0) {
                clearInterval(twoSecTimerRef.current);

                (async () => {
                if (quizContext.selectedAnswerIndex === 0) {
                    quizContext.setSelectedAnswerCssClass("correct");
                    quizContext.setProgressBarCssClass(undefined);
                    setProgressValue(maxValue);
                    await quizContext.sleep(1000);  // <-- 2-second pause here
                    quizContext.setCurrentQuestion((prevValue) => (prevValue < 6 ? prevValue + 1 : 0));
                    quizContext.setSelectedAnswerCssClass(undefined);
                    quizContext.setSelectedAnswerIndex(-1);
                } else {
                    quizContext.setSelectedAnswerCssClass("wrong");
                    quizContext.setProgressBarCssClass(undefined);
                    setProgressValue(maxValue);
                    await quizContext.sleep(1000);  // <-- 2-second pause here
                    quizContext.setCurrentQuestion((prevValue) => (prevValue < 6 ? prevValue + 1 : 0));
                    quizContext.setSelectedAnswerCssClass(undefined);
                    quizContext.setSelectedAnswerIndex(-1);
                }
                })();

                return 0;
            }
            return prev - 50;
            });
        }, 50);

        return () => clearInterval(twoSecTimerRef.current);
        }, [quizContext.selectedAnswerIndex]);


    return (
        <progress 
        className={quizContext.progressBarCssClass}
        value={progressValue}
        max={maxValue}/>
    );
}