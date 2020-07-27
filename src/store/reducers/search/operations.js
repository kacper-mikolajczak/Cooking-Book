import * as actions from "./actions";

import firebase from "../../../Firebase";

var lastItem = null;

const setLastItem = async (item) => {
  lastItem = item ? item : await firebase.recipe("0").get();
};

(async () => await setLastItem())();

const allOrAlive = (auth) => firebase.recipesAllOrAlive(auth);

export const search = (query, append) => async (dispatch, getState) => {
  if (!append) {
    await setLastItem();
    dispatch(actions.fetchPending());
    dispatch(actions.open());
  }

  const lowerQuery = query.toLowerCase();

  const logged = getState().session.authUser;

  const auth = logged !== null ? logged.admin : false;

  const { group, sliders, toggle, groupTick } = getState().searchOptions;

  const recipesRef = await allOrAlive(auth)
    .orderBy("createdAt", "desc")
    .startAfter(lastItem)
    .limit(8)
    //.where("title", "==", query)
    .get();

  await setLastItem(recipesRef.docs[recipesRef.docs.length - 1]);

  const recipesData = recipesRef.docs.map((doc) => doc.data());

  const recipes = Object.values(
    recipesData.filter((item) =>
      Object.values(item)
        .reduce((item, str) => str + item.toLowerCase(), "")
        .includes(lowerQuery)
    )
  );

  const groupedRecipes =
    group === "all" || !groupTick
      ? recipes
      : recipes.filter((item) => item?.groups?.includes(group));

  let filteredRecipes = groupedRecipes;

  if (toggle) {
    for (const [key, val] of Object.entries(sliders)) {
      console.log("FILTER", key, val);
      if (!val.tick) continue;
      filteredRecipes = filteredRecipes.filter(
        (recipe) =>
          recipe.nutrients &&
          recipe.nutrients[key] <= val.max &&
          recipe.nutrients[key] >= val.min
      );
    }
  }

  console.log(
    filteredRecipes,
    groupedRecipes,
    filteredRecipes === groupedRecipes
  );

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
      next: lastItem,
    },
    users,
  };
  if (!append) dispatch(actions.fetchSuccess(searchObj, query));
  else dispatch(actions.fetchMoreSuccess(searchObj));
};

export const searchByUsers = (ids) => async (dispatch, getState) => {
  dispatch(actions.fetchPending());
  dispatch(actions.open());

  const logged = getState().session.authUser;

  const auth = logged ? logged.admin === "admin" : false;

  const recipesRef = await allOrAlive(auth).where("user", "in", ids).get();

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
