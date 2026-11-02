import { useState, useEffect } from "react";
import { useCharacters } from "./useCharacters";
import { renderCharacters } from "./renderCharacters";

export function App() {
  const [text, setText] = useState<string>("");

  const [debouncedText, setDebouncedText] = useState<string>("");

  const request = useCharacters(debouncedText);

  useEffect(() => {
    const time = setTimeout(() => {
      setDebouncedText(text);
    }, 500);
    return () => clearTimeout(time);
  }, [text]);

  return (
    <div className="App">
      <input onChange={(event) => setText(event?.target.value)} value={text} />
      {renderCharacters(request)}
    </div>
  );
}

export default App;
