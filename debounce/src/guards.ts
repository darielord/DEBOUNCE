import { type Character, type CharacterReply } from "./types";

export function isCharacter(value: unknown): value is Character {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    "status" in value &&
    "species" in value &&
    "image" in value &&
    typeof value.name === "string" &&
    typeof value.id === "number" &&
    typeof value.status === "string" &&
    typeof value.species === "string" &&
    typeof value.image === "string"
  );
}

export function isCharacterReply(value: unknown): value is CharacterReply {
  return (
    typeof value === "object" &&
    value !== null &&
    "results" in value &&
    Array.isArray(value.results) &&
    value.results.every(isCharacter)
  );
}
