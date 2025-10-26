import logo from "./assets/quiz-logo.png";
import QuizQuestion from "./components/QuizQuestion";
import Summary from "./components/Summary";

function App() {
    return (
        <>
        <header>
        <img src={logo} alt="Logo" />
        <h1>React Quiz</h1>
        </header>
        <Summary />
        </>
    );
}

export default App;
