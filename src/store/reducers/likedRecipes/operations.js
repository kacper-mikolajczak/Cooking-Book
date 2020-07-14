import * as actions from "./actions";

import firebase from "../../../Firebase";

export const get = () => async (dispatch, getState) => {
  const state = getState();

  try {
    const uid = state.session.authUser?.uid;
    if (!uid) throw "User not found!";

    dispatch(actions.fetchPending());

    const recipes = await firebase
      .likedRecipes(uid)
      .get()
      .then((dbRes) => dbRes.docs.map((doc) => doc.data()));

    dispatch(actions.fetchSuccess(recipes));
  } catch (error) {
    console.log(error);
    dispatch(actions.fetchFailure(error));
  }
};
