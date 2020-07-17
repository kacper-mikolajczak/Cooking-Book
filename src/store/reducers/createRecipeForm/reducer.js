import * as types from "./types";

const initialState = {
  title: "",
  desc: "",
  photoUrl: "",
  lists: {
    ingredients: [{ id: "1", value: "" }],
    steps: [{ id: "1", value: "" }],
  },
};

let nextId = 2;

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.setInput:
      return {
        ...state,
        [payload.name]: payload.value,
      };
    case types.removeListItem: {
      const list = state.lists[payload.name];

      return {
        ...state,
        lists: {
          ...state.lists,
          [payload.name]: list.filter((item) => item.id !== payload.id),
        },
      };
    }
    case types.setListInput: {
      const list = state.lists[payload.name];
      return {
        ...state,
        lists: {
          ...state.lists,
          [payload.name]: list.map((item) =>
            item.id === payload.id ? { ...item, value: payload.value } : item
          ),
        },
      };
    }
    case types.setList: {
      return {
        ...state,
        lists: {
          ...state.lists,
          [payload.name]: payload.list,
        },
      };
    }
    case types.pushEmptyListItem: {
      return {
        ...state,
        lists: {
          ...state.lists,
          [payload.name]: [
            ...state.lists[payload.name],
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
