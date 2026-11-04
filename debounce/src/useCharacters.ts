import { useState } from "react";

import { type ApiError } from "./types";
import { useEffect } from "react";
import { type RequestState } from "./types";

import { type CharacterReply } from "./types";
import { fetchCharacters } from "./fetchCharacters";

const MIN_CHARACTERS = 2;

export function useCharacters(
  name: string,
): RequestState<CharacterReply, ApiError> {
  const [state, setState] = useState<RequestState<CharacterReply, ApiError>>({
    status: "idle",
  });

  const trimmed = name.trim();

  useEffect(() => {
    const controller = new AbortController();

    if (trimmed.length < MIN_CHARACTERS) {
      setState({ status: "idle" });
      return;
    }

    setState({ status: "loading" });

    fetchCharacters(trimmed, controller.signal).then((result) => {
      if (!controller.signal.aborted) {
        if (result.ok) {
          setState({ status: "success", data: result.data });
        } else {
          setState({ status: "error", error: result.error });
        }
      }
    });
    return () => {
      controller.abort();
    };
  }, [trimmed]);

  return state;
}
