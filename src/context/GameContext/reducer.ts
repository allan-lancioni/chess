import { GameContextState, initialState } from ".";

export const gameReducer = (
  state: GameContextState,
  action: { type: string; data: null }
) => {
  switch (action.type) {
    case "reset":
      return initialState;
    default:
      return state;
  }
};