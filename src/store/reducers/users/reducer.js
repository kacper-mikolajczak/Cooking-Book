import * as types from "./types";

const initialState = {
  users: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.usersSet:
      return {
        ...state,
        users: payload.users,
      };
    case types.userSet:
      return {
        ...state,
        users: {
          ...state.users,
          [payload.uid]: payload.user,
        },
      };

    default:
      return state;
  }
};
