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
export const clear = () => ({ type: types.clearError });
