import { GameContextType, initialState } from ".";

export const gameReducer = (
  state: GameContextType,
  action: { type: string; data: null }
) => {
  switch (action.type) {
    case "reset":
      return initialState;
    default:
      return state;
  }
};