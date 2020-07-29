import * as actions from "./actions";

import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { IRecipe } from "../../../interfaces";

import firebase from "../../../Firebase";

export const getEditedRecipe = (recipeId: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  try {
    const res: IRecipe | any = await firebase
      .recipe(recipeId)
      .get()
      .then((res) => res.data());

    dispatch(actions.setEditedRecipe(res));
  } catch (error) {
    console.error(error);
  }
};
