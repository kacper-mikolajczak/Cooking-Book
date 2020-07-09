import * as actions from "./actions";

import firebase from "../../../Firebase";

export const get = () => async (dispatch, getState) => {
  const state = getState();

  try {
    const uid = state.session.authUser?.uid;
    if (!uid) throw "User not found!";

    dispatch(actions.fetchPending());

    firebase.recipes().once("value", (snapshot) => {
      const obj = snapshot.val() ? snapshot.val() : {};
      const arr = [];
      for (const [key, val] of Object.entries(obj)) {
        if (val.user === uid) arr.push({ uid: key, ...val });
      }
      dispatch(actions.fetchSuccess(arr));
    });
  } catch (error) {
    console.log(error);
    dispatch(actions.fetchFailure(error));
  }
};

export const set = (recipe) => async (dispatch, getState) => {
  dispatch(actions.setPending());
  try {
    firebase
      .newRecipe()
      .set(recipe)
      .then((cb) => {
        console.log(cb);
        dispatch(actions.setSuccess());
      });
  } catch (error) {
    dispatch(actions.setFailure(error));
  }
};
