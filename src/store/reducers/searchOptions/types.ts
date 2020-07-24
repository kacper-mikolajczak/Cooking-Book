import { IRange } from "../../../interfaces";

const base = "SEARCH_OPTIONS";

export const setRange = base + "_SET_RANGE";
export const toggleRange = base + "_TOGGLE_RANGE";

export const clearState = base + "_CLEAR_STATE";

export const setGroup = base + "_SET_GROUP";

export const toggle = base + "_TOGGLE";

export interface ClearState {
  type: typeof clearState;
}

export interface SetRange {
  type: typeof setRange;
  payload: {
    range: IRange;
    name: string;
  };
}

export interface ToggleRange {
  type: typeof toggleRange;
  payload: {
    name: string;
    tick: boolean;
  };
}

export interface SetGroup {
  type: typeof setGroup;
  payload: {
    group: string;
  };
}

export interface Toggle {
  type: typeof toggle;
}

export type SearchOptionsActions =
  | ClearState
  | SetRange
  | SetGroup
  | ToggleRange
  | Toggle;
