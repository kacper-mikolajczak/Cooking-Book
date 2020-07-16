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
