import { createContext, useContext } from "react";
import { BLACK, Chess, Color, WHITE } from "chess.js";
import { Board } from "./types";

export type GameContextState = {
  playerColor: Color;
  turn: Color;
  board: Board;
  moves: typeof Chess.prototype.moves;
  fen: typeof Chess.prototype.fen;
  dispatch: React.Dispatch<{ type: string; data: null }>;
};

export const initialState: GameContextState = {
  playerColor: BLACK,
  turn: WHITE,
  board: [],
  moves: () => [],
  fen: () => "",
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