import { render } from "preact";
import { Button } from "./components/ui/button";
import "./style.css";

function App() {
  return <>
    <div class={"p-4 flex gap-4"}>
      <Button>
        Default Button
      </Button>
      <Button size={'sm'}>
        Small Button
      </Button>
      <Button>
        Big Button
      </Button>
    </div>
  </>
}

render(<App />, document.getElementById("app")!);