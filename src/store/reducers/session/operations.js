import * as actions from "./actions";
import { ErrorActions } from "../error";
import firebase from "../../../Firebase";

export const getAuthUser = (id) => async (dispatch, getState) => {
  try {
    const res = await firebase
      .user(id)
      .get()
      .then((res) => res.data());
    dispatch(actions.setAuthUser(res));
  } catch (error) {
    dispatch(ErrorActions.set("User authentication failure!"));
    console.error(error);
  }
};

export const createAuthUser = (user) => async (dispatch, getState) => {
  try {
    await firebase.user(`${user.id}`).set(user);
    dispatch(actions.setAuthUser(user));
  } catch (error) {
    console.error(error);
    dispatch(ErrorActions.set("Couldn't create user!"));
  }
};
