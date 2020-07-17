import * as actions from "./actions";

import firebase from "../../../Firebase";

export const get = () => async (dispatch, getState) => {
  dispatch(actions.fetchPending());

  const likeDocs = await firebase
    .likes()
    .get()
    .then((res) => res.docs);
  const likes = likeDocs
    .map((doc) => ({
      id: doc.id,
      n: Object.keys(doc.data()).length,
    }))
    .sort((a, b) => a.n - b.n);

  const firstTen = likes.slice(0, 10).map((like) => like.id);

  const recipes = await firebase
    .recipesAlive()
    .where("id", "in", firstTen)
    .get()
    .then((res) => res.docs.map((doc) => doc.data()));
  const filler =
    likes.length < 9
      ? await firebase
          .recipesAlive()
          .limit(10)
          .get()
          .then((res) => res.docs.map((doc) => doc.data()))
      : [];
  const filteredFiller = filler.filter(
    (f) => recipes.find((recipe) => recipe.id === f.id) === undefined
  );

  const combinedRecipes = [...recipes, ...filteredFiller]
    .map((recipe) => {
      const foundLikes = likes.find((like) => like.id === recipe.id);
      return {
        ...recipe,
        likes: foundLikes ? foundLikes.n : 0,
      };
    })
    .sort((a, b) => b.likes - a.likes);

  dispatch(actions.fetchSuccess(combinedRecipes));
};
