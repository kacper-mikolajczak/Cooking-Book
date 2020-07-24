import * as types from "./types";
import { IRange } from "../../../interfaces";

export const setRange = ({
  name,
  range,
}: {
  name: string;
  range: IRange;
}): types.SetRange => ({
  type: types.setRange,
  payload: { name, range },
});

export const toggleRange = ({
  name,
  tick,
}: {
  name: string;
  tick: boolean;
}) => ({
  type: types.toggleRange,
  payload: { name, tick },
});

export const clearState = (): types.ClearState => ({ type: types.clearState });

export const toggle = (): types.Toggle => ({ type: types.toggle });

export const setGroup = (group: string): types.SetGroup => ({
  type: types.setGroup,
  payload: { group },
});
