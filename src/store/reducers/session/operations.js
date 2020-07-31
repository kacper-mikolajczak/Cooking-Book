import * as actions from "./actions";

import firebase from "../../../Firebase";

export const getAuthUser = (id) => async (dispatch, getState) => {
  try {
    const res = await firebase
      .user(id)
      .get()
      .then((res) => res.data());
    dispatch(actions.setAuthUser(res));
  } catch (error) {
    console.error(error);
  }
};

export const createAuthUser = (user) => async (dispatch, getState) => {
  debugger;
  await firebase
    .user("123")
    .set(user)
    .then(() => console.log("Then firebase"))
    .finally(() => console.log("Finally firebase"));
  console.log("After firebase");
  debugger;
  dispatch(actions.setAuthUser(user));
};
