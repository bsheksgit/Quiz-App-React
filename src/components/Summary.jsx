import quizComplete from "../assets/quiz-complete.png"

export default function Summary(){
        return(
            <>
            <section id="summary">
            <img src={quizComplete}/>
            <h2>Quiz Completed!</h2>
            <div id="summary-stats">
            <div>
            <p className="number">100%</p>
            <p className="text">Skipped</p>
            </div>
            <div>
            <p className="number">100%</p>
            <p className="text">Skipped</p>
            </div>
            <div>
            <p className="number">100%</p>
            <p className="text">Skipped</p>
            </div>
            </div>
            <ol>
            <li>
                <h3>1</h3>
                <p className="question">What is React?</p>
                <p className="user-answer correct">React is a UI building tool.</p>
            </li>

            </ol>
            </section>
            </>
        );
        }