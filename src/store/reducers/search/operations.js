import * as actions from "./actions";

import firebase from "../../../Firebase";

export const search = (query) => async (dispatch, getState) => {
  dispatch(actions.fetchPending());
  dispatch(actions.open());

  const resRecipes = await firebase
    .recipes()
    .where("title", "==", query)
    .get()
    .then((res) => res.docs.map((doc) => doc.data()));

  const resUsersLastName = await firebase
    .users()
    .where("lastName", "==", query)
    .get()
    .then((res) => res.docs.map((doc) => doc.data()));

  const resUsersFirstName = await firebase
    .users()
    .where("firstName", "==", query)
    .get()
    .then((res) => res.docs.map((doc) => doc.data()));

  const searchObj = {
    recipes: resRecipes,
    users: { ...resUsersLastName, ...resUsersFirstName },
  };

  console.log(searchObj);
  dispatch(actions.fetchSuccess(searchObj));
};
