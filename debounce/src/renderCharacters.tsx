import { type RequestState } from "./types";

import { type CharacterReply } from "./types";

import { type ApiError } from "./types";

export function renderCharacters(
  request: RequestState<CharacterReply, ApiError>,
) {
  switch (request.status) {
    case "idle":
      return <p> {"Escriba su nombre"} </p>;

    case "loading":
      return <p> {"Espera..."} </p>;

    case "success":
      return (
        <ul>
          {request.data.results.map((cha) => {
            return (
              <li key={cha.id}>
                {cha.name} {<img src={cha.image} alt={cha.name} />}{" "}
              </li>
            );
          })}
        </ul>
      );

    case "error":
      return <p> {"Error increible"}</p>;

    default:
      const pred: never = request;
      throw new Error(`Estado desconocido ${pred}`);
  }
}
