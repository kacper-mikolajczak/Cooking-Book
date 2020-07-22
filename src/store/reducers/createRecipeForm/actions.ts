import * as types from "./types";
import { IListItem } from "../../../interfaces";

export const setInput = ({
  name,
  value,
}: {
  name: string;
  value: string;
}): types.SetInput => ({
  type: types.setInput,
  payload: { name, value },
});

export const pushEmptyListItem = ({
  name,
}: {
  name: string;
}): types.PushEmptyListItem => ({
  type: types.pushEmptyListItem,
  payload: { name },
});
export const removeItemsList = (
  name: string,
  id: string
): types.RemoveItemsList => ({
  type: types.removeListItem,
  payload: { name, id },
});
export const setListInput = ({
  id,
  name,
  value,
}: {
  name: string;
  id: string;
  value: string;
}): types.SetListInput => ({
  type: types.setListInput,
  payload: { id, name, value },
});
export const setList = (name: string, list: IListItem[]): types.SetList => ({
  type: types.setList,
  payload: { name, list },
});

export const clearState = (): types.ClearState => ({ type: types.clearState });
