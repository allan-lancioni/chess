import { createContext, useContext } from "react";
import { WHITE, BLACK, Chess } from "chess.js";
import { Board } from "./types";

export type GameContextState = {
  playerColor: typeof WHITE | typeof BLACK;
  fen: typeof Chess.prototype.fen;
  board: Board;
  dispatch: React.Dispatch<{ type: string; data: null }>;
};

export const initialState: GameContextState = {
  playerColor: BLACK,
  fen: () => "",
  board: [],
  dispatch: () => void(0),
};

export const GameContext = createContext<GameContextState>(initialState);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameProvider must be used within a GameProvider");
  }
  return context;
}