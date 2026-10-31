import { useState } from "react";

import { type ApiError } from "./types";
import { useEffect } from "react";
import { type RequestState } from "./types";

import { type CharacterReply } from "./types";
import { fetchCharacters } from "./fetchCharacters";

export function useCharacters(
  name: string,
): RequestState<CharacterReply, ApiError> {
  const [state, setState] = useState<RequestState<CharacterReply, ApiError>>({
    status: "idle",
  });

  useEffect(() => {
    const controller = new AbortController();

    setState({ status: "loading" });

    fetchCharacters(name, controller.signal).then((Result) => {
      if (!controller.signal.aborted) {
        if (Result.ok) {
          setState({ status: "success", data: Result.data });
        } else {
          setState({ status: "error", error: Result.error });
        }
      }
    });
    return () => {
      controller.abort();
    };
  }, [name]);

  return state;
}
