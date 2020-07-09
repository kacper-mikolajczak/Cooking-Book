import * as types from "./types";

export const setAuthUser = (authUser) => ({
  type: types.authUserSet,
  payload: { authUser },
});
