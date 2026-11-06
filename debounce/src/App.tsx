import { useState, useRef, useEffect } from "react";
import { useCharacters } from "./useCharacters";
import { renderCharacters } from "./renderCharacters";
import { useDebounce } from "./useDebounce";

export function App() {
  const [text, setText] = useState<string>("");

  const debouncedText = useDebounce(text, 500);
  const request = useCharacters(debouncedText);

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current !== null) ref.current.focus();
  }, []);

  return (
    <div className="App">
      <input
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setText("");
          }
        }}
        ref={ref}
        onChange={(event) => setText(event.target.value)}
        value={text}
      />
      {renderCharacters(request)}
    </div>
  );
}

export default App;
