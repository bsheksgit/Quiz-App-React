import { QuizContext } from "../store/quiz-app-context";
import { useCallback, useContext, useState, useEffect, useRef } from "react";

export default function ProgressBar(){

        const quizContext = useContext(QuizContext);
        const [maxValue, setMaxValue] = useState(10000);
        const [progressValue, setProgressValue] = useState(maxValue);

        const tenSecTimerRef = useRef();
        const twoSecTimerRef = useRef();

        // Logging the state change.
        useEffect(() => {
            if(quizContext.currentQuestion === 6){
                console.log(quizContext.selectedAnswerArray);
            }
        }, [quizContext.selectedAnswerArray]);


        // Effect for when currentQuestion changes
        useEffect(() => {
        setMaxValue(1000);
        setProgressValue(1000);
        quizContext.setProgressBarCssClass(undefined);
          // Clear previous interval if exists
        if (tenSecTimerRef.current) {
            clearInterval(tenSecTimerRef.current);
        }

        tenSecTimerRef.current = setInterval(() => {
            setProgressValue((prev) => {
            if (prev <= 0) {
                if(quizContext.currentQuestion <= 6 && quizContext.selectedAnswerArray.length < 7){
                    quizContext.setSelectedAnswerArray(prevArray=>[...prevArray, -1]);
                }
                clearInterval(tenSecTimerRef.current);
                quizContext.setSelectedAnswerCssClass(undefined);
                quizContext.setCurrentQuestion((prevValue) => ((prevValue < 6 && prevValue >=0) ? prevValue + 1 : 6 ));
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
                    quizContext.setSelectedAnswerArray(prevArray=>[...prevArray, quizContext.selectedAnswerIndex]);
                    await quizContext.sleep(1000);  // <-- 1-second pause here
                    quizContext.setCurrentQuestion((prevValue) => ((prevValue < 6 && prevValue >=0) ? prevValue + 1 : 6 ));
                    quizContext.setSelectedAnswerCssClass(undefined);
                    quizContext.setSelectedAnswerIndex(-1);
                }
                else {
                    quizContext.setSelectedAnswerCssClass("wrong");
                    quizContext.setProgressBarCssClass(undefined);
                    setProgressValue(maxValue);
                    quizContext.setSelectedAnswerArray(prevArray=>[...prevArray, quizContext.selectedAnswerIndex]);
                    await quizContext.sleep(1000);  // <-- 1-second pause here
                    quizContext.setCurrentQuestion((prevValue) => ((prevValue < 6 && prevValue >=0) ? prevValue + 1 : 6 ));
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