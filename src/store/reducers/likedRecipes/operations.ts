import * as actions from "./actions";
import { ThunkDispatch } from "redux-thunk";
import firebase from "../../../Firebase";
import { AnyAction } from "redux";
import { IRecipe } from "../../../interfaces";

export const getUserLikedRecipes = () => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => any
) => {
  const state = getState();

  try {
    const id = state.session.authUser?.id;
    if (!id) throw new Error("User not found!");

    dispatch(actions.fetchPending());

    const likedRecipesIds = await firebase
      .likes()
      .where(id, "==", true)
      .get()
      .then((dbRes) => dbRes.docs.map((doc) => doc.id));

    const recipes = (await firebase
      .recipesAlive()
      .get()
      .then((dbRes) =>
        dbRes.docs
          .filter((doc) => likedRecipesIds.includes(doc.id))
          .map((doc) => doc.data())
      )) as IRecipe[];

    dispatch(actions.fetchSuccess(recipes));
  } catch (error) {
    console.error(error);
    dispatch(actions.fetchFailure(error));
  }
};
