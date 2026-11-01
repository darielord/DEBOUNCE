import { useState } from "react";
import { useCharacters } from "./useCharacters";
import { renderCharacters } from "./renderCharacters";

export function App() {
  const [text, setText] = useState<string>("");

  const request = useCharacters(text);

  return (
    <div className="App">
      <input onChange={(event) => setText(event?.target.value)} value={text} />
      {renderCharacters(request)}
    </div>
  );
}

export default App;
