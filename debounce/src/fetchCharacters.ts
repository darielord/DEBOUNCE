import { type CharacterReply } from "./types";

import { type ApiError } from "./types";

import { type Result } from "./types";

import { isCharacterReply } from "./guards";

export async function fetchCharacters(
  name: string,
  signal: AbortSignal,
): Promise<Result<CharacterReply, ApiError>> {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(name)}`,
      { signal },
    );
    if (!response.ok) {
      return { ok: false, error: { kind: "http", status: response.status } };
    }

    const data: unknown = await response.json();

    if (isCharacterReply(data)) {
      return { ok: false, error: { kind: "invalid-data", message: "error" } };
    }
  } catch {
    return { ok: false, error: { kind: "network" } };
  }
}
