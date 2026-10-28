export type Character = {
  readonly id: number;
  readonly name: string;
  readonly status: string;
  readonly species: string;
  readonly image: string;
};

export type ApiError =
  | { readonly kind: "network" }
  | { readonly kind: "http"; readonly status: number }
  | { readonly kind: "invalid-data"; readonly message: string };

export type Result<T, E> =
  | { readonly ok: true; readonly data: T }
  | { readonly ok: false; readonly error: E };

export type RequestState<T, E> =
  | { readonly status: "idle" }
  | { readonly status: "loading" }
  | { readonly status: "success"; readonly data: T }
  | { readonly status: "error"; readonly error: E };

export type CharacterReply = {
  readonly results: readonly Character[];
};
