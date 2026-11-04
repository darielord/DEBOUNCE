import { useState } from "react";
import { useCharacters } from "./useCharacters";
import { renderCharacters } from "./renderCharacters";
import { useDebounce } from "./useDebounce";
export function App() {
  const [text, setText] = useState<string>("");

  const debouncedText = useDebounce(text, 500);
  const request = useCharacters(debouncedText);

  return (
    <div className="App">
      <input onChange={(event) => setText(event?.target.value)} value={text} />
      {renderCharacters(request)}
    </div>
  );
}

export default App;
