import * as types from "./Error.Types";

import { IError } from "../../../interfaces";

var nextId = 0;

export const errorInitState: IError[] = [
  //Error -> msg and id { id: 1, msg: "Bulbazaur is not here"}
];

const errorsReducer = (state = errorInitState, action: types.ErrorActions) => {
  switch (action.type) {
    case types.pushError:
      return [
        {
          id: nextId++,
          msg: action.payload.msg,
        },
        ...state,
      ];
    case types.popError:
      return state.slice(0, state.length - 1);
    case types.setError:
      return [
        {
          id: nextId++,
          msg: action.payload.msg,
        },
        ...state,
      ];
    case types.unsetError: {
      return state.filter((error) => error.id !== action.payload.id);
    }

    case types.clearError:
      return [];
    default:
      return state;
  }
};

export default errorsReducer;
