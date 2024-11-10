import { createContext, useContext } from "react";
import { Chess } from "chess.js";

export type GameContextType = {
  chess: Chess;
  dispatch: React.Dispatch<{ type: string; data: null }>;
};

export const initialState = {
  chess: new Chess(),
  dispatch: () => null,
};

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

export const GameContext = createContext<GameContextType>(initialState);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameProvider must be used within a GameProvider");
  }
  return context;
}