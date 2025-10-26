        
export default function QuizQuestion(){
        return(
        <>
        <section id="quiz">
        <div id ="question">
            <progress value={40} max={100} />
            <h2>What is JSX?</h2>
        </div>
        <ul id="answers">
        <li class="answer"><button>A. useState</button></li>
        <li class="answer"><button>B. useEffect</button></li>
        <li class="answer"><button>C. useMemo</button></li>
        <li class="answer"><button>D. useRef</button></li>
        </ul>
        </section>
        </>
        );
}