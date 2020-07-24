import { IListItem, IRecipe } from "../../../interfaces";

export const setInput = "RECIPE_FORM_SET_INPUT";

export const setNutritienInput = "RECIPE_FORM_SET_NUTRITIENT_INPUT";

export const pushEmptyListItem = "RECIPE_FORM_PUSH_EMPTY_LIST_ITEM";
export const removeListItem = "RECIPE_FORM_REMOVE_LIST_ITEM";
export const setListInput = "RECIPE_FORM_SET_LIST_INPUT";
export const setList = "RECIPE_FORM_SET_LIST";

export const clearState = "RECIPE_FORM_CLEAR_STATE";

export const setState = "RECIPE_FORM_SET_STATE";

export interface Input {
  name: string;
  value: string;
}
export interface NumericInput {
  name: string;
  value: number;
}

export interface SetInput {
  type: typeof setInput;
  payload: Input;
}

export interface SetNutritientInput {
  type: typeof setNutritienInput;
  payload: NumericInput;
}

export interface PushEmptyListItem {
  type: typeof pushEmptyListItem;
  payload: {
    name: string;
  };
}

export interface RemoveItemsList {
  type: typeof removeListItem;
  payload: {
    name: string;
    id: string;
  };
}
export interface SetListInput {
  type: typeof setListInput;
  payload: {
    id: string;
    name: string;
    value: string;
  };
}

export interface SetList {
  type: typeof setList;
  payload: {
    name: string;
    list: IListItem[];
  };
}

export interface ClearState {
  type: typeof clearState;
}

export interface SetState {
  type: typeof setState;
  payload: IRecipe;
}

export type RecipeFormActions =
  | SetInput
  | SetNutritientInput
  | PushEmptyListItem
  | RemoveItemsList
  | SetListInput
  | SetList
  | ClearState
  | SetState;
