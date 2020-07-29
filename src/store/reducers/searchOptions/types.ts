import { IRange } from "../../../interfaces";

export const setRange = "SEARCH_OPTIONS_SET_RANGE";
export const toggleRange = "SEARCH_OPTIONS_TOGGLE_RANGE";

export const clearState = "SEARCH_OPTIONS_CLEAR_STATE";

export const setGroup = "SEARCH_OPTIONS_SET_GROUP";
export const toggleGroup = "SEARCH_OPTIONS_TOGGLE_GROUP";

export const toggle = "SEARCH_OPTIONS_TOGGLE";

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

export interface ToggleGroup {
  type: typeof toggleGroup;
  payload: {
    tick: boolean;
  };
}

export interface Toggle {
  type: typeof toggle;
}

export type SearchOptionsActions =
  | SetRange
  | ClearState
  | SetGroup
  | ToggleGroup
  | ToggleRange
  | Toggle;
