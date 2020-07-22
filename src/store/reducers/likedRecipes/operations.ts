import * as actions from "./actions";
import { ThunkDispatch } from "redux-thunk";
import firebase from "../../../Firebase";
import { AnyAction } from "redux";

export const get = () => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => any
) => {
  const state = getState();

  try {
    const uid = state.session.authUser?.uid;
    if (!uid) throw new Error("User not found!");

    dispatch(actions.fetchPending());

    const recipes = await firebase
      .recipe(uid)
      .get()
      .then((dbRes: any) => dbRes.docs.map((doc: any) => doc.data()));

    dispatch(actions.fetchSuccess(recipes));
  } catch (error) {
    console.error(error);
    dispatch(actions.fetchFailure(error));
  }
};
