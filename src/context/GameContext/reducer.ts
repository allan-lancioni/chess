import invariant from "tiny-invariant";
import { GameContextState, initialState } from ".";
import { actionTypes, ReducerAction } from "./types";

export const gameReducer = (state: GameContextState, action: ReducerAction) => {
  switch (action.type) {
    case actionTypes.MOVE:
      invariant(action.data, "Missing move!");
      try {
        const { from, to, promotion } = action.data;
        state._chess.move({ from, to, promotion });
        console.log("Move!");
      } catch (error) {
        console.error(error);
      }
      return { ...initialState };
    case actionTypes.RESET:
      return initialState;
    default:
      return state;
  }
};
