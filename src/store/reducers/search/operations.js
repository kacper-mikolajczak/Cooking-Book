import * as actions from "./actions";

import firebase from "../../../Firebase";

export const search = (query) => async (dispatch, getState) => {
  dispatch(actions.fetchPending());
  dispatch(actions.open());

  const lowerQuery = query.toLowerCase();

  const resRecipes = await firebase
    .recipesAlive()
    //.where("title", "==", query)
    .get()
    .then((res) => res.docs.map((doc) => doc.data()));

  const recipes = Object.values(resRecipes).filter((item) =>
    Object.values(item)
      .reduce((item, str) => str + item.toLowerCase(), "")
      .includes(lowerQuery)
  );

  const resUsers = await firebase
    .users()
    //.where("lastName", "==", query)
    .get()
    .then((res) => res.docs.map((doc) => doc.data()));

  const users = Object.values(resUsers).filter((item) =>
    Object.values(item)
      .reduce((item, str) => str + item.toLowerCase(), "")
      .includes(lowerQuery)
  );

  const searchObj = {
    recipes,
    users,
  };
  dispatch(actions.fetchSuccess(searchObj));
};
