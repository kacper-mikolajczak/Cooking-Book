import { IListItem } from "../../../interfaces";

export const setInput = "SET_INPUT";

export const pushEmptyListItem = "PUSH_EMPTY_LIST_ITEM";
export const removeListItem = "REMOVE_LIST_ITEM";
export const setListInput = "SET_LIST_INPUT";
export const setList = "SET_LIST";

export const clearState = "CLEAR_STATE";

export interface Input {
  name: string;
  value: string;
}
export interface SetInput {
  type: typeof setInput;
  payload: Input;
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

export type RecipeFormActions =
  | SetInput
  | PushEmptyListItem
  | RemoveItemsList
  | SetListInput
  | SetList
  | ClearState;
