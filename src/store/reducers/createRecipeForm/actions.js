import * as types from "./types";

export const setInput = ({ name, value }) => ({
  type: types.setInput,
  payload: { name, value },
});

export const pushEmptyListItem = ({ name }) => ({
  type: types.pushEmptyListItem,
  payload: { name },
});
export const removeItemsList = (name, id) => ({
  type: types.removeListItem,
  payload: { name, id },
});
export const setListInput = ({ id, name, value }) => ({
  type: types.setListInput,
  payload: { id, name, value },
});
export const setList = (name, list) => ({
  type: types.setList,
  payload: { name, list },
});

export const clearState = () => ({ type: types.clearState });
