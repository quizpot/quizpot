import { render } from "preact";
import { QuizSchema } from "@quizpot/core";

function App() {
  return <h1>Quizpot Web Ready</h1>;
}

render(<App />, document.getElementById("app")!);