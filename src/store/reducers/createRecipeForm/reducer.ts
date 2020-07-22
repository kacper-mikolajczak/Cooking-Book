import * as types from "./types";
import { IListItem } from "../../../interfaces";

interface IState {
  title: string;
  desc: string;
  photoUrl: string;
  groups: string;
  lists: {
    ingredients: IListItem[];
    steps: IListItem[];
    [key: string]: IListItem[];
  };
}

const initialState: IState = {
  title: "",
  desc: "",
  photoUrl: "",
  groups: "",
  lists: {
    ingredients: [{ id: "1", value: "" }],
    steps: [{ id: "1", value: "" }],
  },
};

let nextId = 2;

const reducer = (state = initialState, action: types.RecipeFormActions) => {
  switch (action.type) {
    case types.setInput:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case types.removeListItem: {
      const list = state.lists[action.payload.name];

      return {
        ...state,
        lists: {
          ...state.lists,
          [action.payload.name]: list.filter(
            (item: IListItem) => item.id !== action.payload.id
          ),
        },
      };
    }
    case types.setListInput: {
      const list = state.lists[action.payload.name];
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.payload.name]: list.map((item: IListItem) =>
            item.id === action.payload.id
              ? { ...item, value: action.payload.value }
              : item
          ),
        },
      };
    }
    case types.setList: {
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.payload.name]: action.payload.list,
        },
      };
    }
    case types.pushEmptyListItem: {
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.payload.name]: [
            ...state.lists[action.payload.name],
            { id: nextId++, value: "" },
          ],
        },
      };
    }
    case types.clearState:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
