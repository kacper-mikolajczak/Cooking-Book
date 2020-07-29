export const pushError = "GLOBAL_ERROR_PUSH";
export const popError = "GLOBAL_ERROR_POP";

export const setError = "GLOBAL_ERROR_SET";
export const unsetError = "GLOBAL_ERROR_UNSET";

export const clearError = "GLOBAL_ERROR_CLEAR";

export interface PushError {
  type: typeof pushError;
  payload: {
    msg: string;
  };
}

export interface PopError {
  type: typeof popError;
}

export interface SetError {
  type: typeof setError;
  payload: {
    msg: string;
  };
}
export interface UnsetError {
  type: typeof unsetError;
  payload: {
    id: string;
  };
}

export interface ClearError {
  type: typeof clearError;
}

export type ErrorActions =
  | PushError
  | PopError
  | SetError
  | UnsetError
  | ClearError;
