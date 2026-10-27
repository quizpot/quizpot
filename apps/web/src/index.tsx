import { render } from "preact";
import { Button } from "./components/ui/button";
import "./style.css";

function App() {
  return <>
    <Button>
      Testing Noep
    </Button>  
  </>
}

render(<App />, document.getElementById("app")!);