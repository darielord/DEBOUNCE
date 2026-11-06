import { type RequestState } from "./types";

import { type CharacterReply } from "./types";

import { type ApiError } from "./types";

function errorMessage(error: ApiError): string {
  switch (error.kind) {
    case "network":
      return "No hay internet o servidor caido";
    case "http":
      if (error.status === 404) {
        return "No hay resultados para esa búsqueda";
      } else if (error.status === 429) {
        return "buscando muy rapido";
      } else {
        return `error ${error.status}`;
      }
    case "invalid-data":
      return "respuesta inesperada";
    default:
      const pred: never = error;
      throw new Error(`Estado desconocido ${pred}`);
  }
}

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
      return <p> {errorMessage(request.error)}</p>;

    default:
      const pred: never = request;
      throw new Error(`Estado desconocido ${pred}`);
  }
}
