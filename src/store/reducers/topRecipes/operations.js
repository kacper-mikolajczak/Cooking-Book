import * as actions from "./actions";

import firebase from "../../../Firebase";

export const get = () => async (dispatch, getState) => {
  if (getState().topRecipes.data.length > 0) return Promise.resolve();

  dispatch(actions.fetchPending());

  const likeDocs = await firebase
    .likes()
    .get()
    .then((res) => res.docs);
  const likes = likeDocs.map((doc) => ({
    id: doc.id,
    n: Object.keys(doc.data()).length,
  }));
  likes.sort((a, b) => a.n - b.n);

  const firstTen = likes.slice(0, 10).map((like) => like.id);

  const recipes = await firebase
    .recipes()
    .where("id", "in", firstTen)
    .get()
    .then((res) => res.docs.map((doc) => doc.data()));

  dispatch(actions.fetchSuccess(recipes));
};
