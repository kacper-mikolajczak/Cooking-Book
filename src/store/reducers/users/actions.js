import * as types from "./types";

export const setUser = (payload) => {
  return { type: types.userSet, payload };
};
