import * as actions from "./Error.Actions";

import { ThunkDispatch } from "redux-thunk";

import { AnyAction } from "redux";

export const showErrorWithDelay = (msg: string, delay: number) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(actions.set(msg));

  setTimeout(() => dispatch(actions.clear()), delay);
};
