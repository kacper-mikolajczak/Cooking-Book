import * as actions from "./Error.Actions";

export const showErrorWithDelay = (msg: string, delay: number) => async (
  dispatch
) => {
  dispatch(actions.set(msg));

  setTimeout(() => dispatch(actions.clear()), delay);
};
