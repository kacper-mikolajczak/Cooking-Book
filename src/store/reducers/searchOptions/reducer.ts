import * as types from "./types";
import { IRangeToggle } from "../../../interfaces";

interface IState {
  toggle: boolean;
  group: string;
  sliders: {
    kcal: IRangeToggle;
    carbs: IRangeToggle;
    fats: IRangeToggle;
    proteins: IRangeToggle;
    salt: IRangeToggle;
  };
}

const initialState = {
  toggle: false,
  group: "all",
  sliders: {
    kcal: {
      min: 0,
      max: 9999,
      tick: true,
    },
    carbs: {
      min: 0,
      max: 9999,
      tick: true,
    },
    fats: {
      min: 0,
      max: 9999,
      tick: true,
    },
    proteins: {
      min: 0,
      max: 9999,
      tick: true,
    },
    salt: {
      min: 0,
      max: 9999,
      tick: true,
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
          [action.payload.name]: {
            ...state.sliders[action.payload.name],
            min: action.payload.range.min,
            max: action.payload.range.max,
          },
        },
      };
    case types.toggleRange:
      return {
        ...state,
        sliders: {
          ...state.sliders,
          [action.payload.name]: {
            ...state.sliders[action.payload.name],
            tick: action.payload.tick,
          },
        },
      };
    case types.setGroup:
      return {
        ...state,
        group: action.payload.group,
      };
    case types.toggle:
      return {
        ...state,
        toggle: !state.toggle,
      };
    case types.clearState:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
