import * as types from "./types";
import { IRange } from "../../../interfaces";

interface IState {
  group: string;
  sliders: {
    calories: IRange;
    carbs: IRange;
    fats: IRange;
    proteins: IRange;
    salt: IRange;
  };
}

const initialState = {
  group: "all",
  sliders: {
    calories: {
      min: 0,
      max: 9999,
    },
    carbs: {
      min: 0,
      max: 9999,
    },
    fats: {
      min: 0,
      max: 9999,
    },
    proteins: {
      min: 0,
      max: 9999,
    },
    salt: {
      min: 0,
      max: 9999,
    },
  },
};

const reducer = (state = initialState, action: types.SearchOptionsActions) => {
  switch (action.type) {
    case types.setRange:
      return {
        ...state,
        sliders: {
          ...state.sliders,
          [action.payload.name]: { ...action.payload.range },
        },
      };
    case types.setGroup:
      return {
        ...state,
        group: action.payload.group,
      };
    case types.clearState:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
