import * as types from "./types";

export const setAuthUserID = (id) => {
  return {
    type: types.authUserSetID,
    payload: { id },
  };
};

export const setAuthUser = (authUser) => {
  return {
    type: types.authUserSet,
    payload: { ...authUser },
  };
};

export const unsetAuthUser = () => ({ type: types.authUserUnset });
