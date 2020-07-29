import * as types from "./types";
import { IListItem, INutrient } from "../../../interfaces";

interface IState {
  title: string;
  desc: string;
  photoUrl: string;
  groups: string;
  ingredients: IListItem[];
  steps: IListItem[];
  nutrients: INutrient;
  [key: string]: IListItem[] | string | INutrient;
}

const initialState: IState = {
  title: "",
  desc: "",
  photoUrl: "",
  groups: "",
  ingredients: [{ id: "1", value: "" }],
  steps: [{ id: "1", value: "" }],
  nutrients: {
    proteins: null,
    kcal: null,
    fats: null,
    carbs: null,
    salt: null,
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
      const list = state[action.payload.name] as IListItem[];

      return {
        ...state,
        [action.payload.name]: list.filter(
          (item: IListItem) => item.id !== action.payload.id
        ),
      };
    }
    case types.setNutritienInput:
      return {
        ...state,
        nutrients: {
          ...state.nutrients,
          [action.payload.name]: action.payload.value,
        },
      };
    case types.setListInput: {
      const list = state[action.payload.name] as IListItem[];
      return {
        ...state,
        [action.payload.name]: list.map((item: IListItem) =>
          item.id === action.payload.id
            ? { ...item, value: action.payload.value }
            : item
        ),
      };
    }
    case types.setList: {
      return {
        ...state,
        [action.payload.name]: action.payload.list,
      };
    }
    case types.pushEmptyListItem: {
      return {
        ...state,
        [action.payload.name]: [
          ...(state[action.payload.name] as IListItem[]),
          { id: nextId++, value: "" },
        ],
      };
    }
    case types.setState:
      return action.payload;
    case types.clearState:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
