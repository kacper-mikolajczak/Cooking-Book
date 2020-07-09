import * as types from "./types";

const initialState = {
  authUser: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.authUserSet:
      return {
        ...state,
        authUser: payload.authUser,
      };

    default:
      return state;
  }
};

export default reducer;
