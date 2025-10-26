import quizComplete from "../assets/quiz-complete.png"

export default function Summary(){
        return(
            <>
            <section id="summary">
            <img src={quizComplete}/>
            <h2>Quiz Completed!</h2>
            </section>
            </>
        );
        }