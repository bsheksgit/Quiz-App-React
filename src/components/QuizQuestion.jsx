import { QuizContext } from "../store/quiz-app-context";
import { useContext } from "react";

export default function QuizQuestion(){

        const quizContext = useContext(QuizContext);

        return(
        <>
        <section id="quiz">
        <div id ="question">
            <progress value={40} max={100} />
            <h2>{quizContext.questionOptions[0].text}</h2>
        </div>
        <ul id="answers">
        <li className="answer"><button className="selected">A. useState</button></li>
        <li className="answer"><button>B. useEffect</button></li>
        <li className="answer"><button>C. useMemo</button></li>
        <li className="answer"><button>D. useRef</button></li>
        </ul>
        </section>
        </>
        );
}