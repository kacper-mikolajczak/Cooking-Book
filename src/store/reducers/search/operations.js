import * as actions from "./actions";

import firebase from "../../../Firebase";

var lastItem = null;

const allOrAlive = (auth) => firebase.recipesAllOrAlive(auth)();

export const search = (query) => async (dispatch, getState) => {
  dispatch(actions.fetchPending());
  dispatch(actions.open());

  const lowerQuery = query.toLowerCase();

  const logged = getState().session.authUser;

  const auth = logged ? logged.admin === "admin" : false;

  const group = getState().search.group;

  const recipesRef = await allOrAlive(auth)
    .orderBy("createdAt")
    // .limit(5)
    //.where("title", "==", query)
    .get();

  const recipesData = recipesRef.docs.map((doc) => doc.data());

  const recipes = Object.values(
    recipesData.filter((item) =>
      Object.values(item)
        .reduce((item, str) => str + item.toLowerCase(), "")
        .includes(lowerQuery)
    )
  );

  const filteredRecipes =
    group === "all"
      ? recipes
      : recipes.filter((item) => item?.groups?.includes(group));

  const resUsers = await firebase
    .users()
    .get()
    .then((res) => res.docs.map((doc) => doc.data()));

  const users = Object.values(resUsers).filter((item) =>
    Object.values(item)
      .reduce((item, str) => str + item.toLowerCase(), "")
      .includes(lowerQuery)
  );

  const searchObj = {
    recipes: {
      data: filteredRecipes,
      next: null,
    },
    users,
  };
  dispatch(actions.fetchSuccess(searchObj));
};

export const searchByUser = (id) => async (dispatch, getState) => {
  console.log("SEARCHBYUSER");
  dispatch(actions.fetchPending());
  dispatch(actions.open());

  const logged = getState().session.authUser;

  const auth = logged ? logged.admin === "admin" : false;

  const recipesRef = await allOrAlive(auth).where("user", "==", id).get();

  const recipesData = recipesRef.docs.map((doc) => doc.data());

  const searchObj = {
    recipes: {
      data: Object.values(recipesData),
      next: null,
    },
    users: [getState().session.authUser],
  };

  dispatch(actions.fetchSuccess(searchObj));
};
