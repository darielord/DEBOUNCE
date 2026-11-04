import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [state, setState] = useState<T>(value);

  useEffect(() => {
    const time = setTimeout(() => {
      setState(value);
    }, delay);
    return () => clearTimeout(time);
  }, [value, delay]);

  return state;
}
