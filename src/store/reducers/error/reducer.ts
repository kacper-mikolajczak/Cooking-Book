import * as types from "./Error.Types";

var nextId = 0;

export const errorInitState = [
  //Error -> msg and id { id: 1, msg: "Bulbazaur is not here"}
];

const errorsReducer = (state = errorInitState, action) => {
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
    case types.clearError:
      return [];
    default:
      return state;
  }
};

export default errorsReducer;
