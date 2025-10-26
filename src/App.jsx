import logo from "./assets/quiz-logo.png";
import QuizQuestion from "./components/QuizQuestion";
import Summary from "./components/Summary";
import QuizContextProvider, { QuizContext } from "./store/quiz-app-context";

function App() {
    return (
        <>
        <QuizContextProvider>
        <header>
        <img src={logo} alt="Logo" />
        <h1>React Quiz</h1>
        </header>
        <QuizQuestion />
        </QuizContextProvider>
        </>
    );
}

export default App;
