import * as types from "./Error.Types";

export const push = (msg: string) => ({
  type: types.pushError,
  payload: { msg },
});
export const pop = () => ({ type: types.popError });

export const set = (msg: string) => ({
  type: types.setError,
  payload: { msg },
});

export const unset = (id: string) => ({
  type: types.unsetError,
  payload: { id },
});

export const clear = () => ({ type: types.clearError });
