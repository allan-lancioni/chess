import { createContext, useContext } from "react";
import { Chess, Color, WHITE } from "chess.js";

export type GameContextState = {
  playerColor: Color;
  turn: Color;
  board: ReturnType<typeof Chess.prototype.board>;
  moves: typeof Chess.prototype.moves;
  fen: typeof Chess.prototype.fen;
  dispatch: React.Dispatch<{ type: string; data: null }>;
};

export const initialState: GameContextState = {
  playerColor: WHITE,
  turn: WHITE,
  board: [],
  moves: () => [],
  fen: () => "",
  dispatch: () => void 0,
};

export const GameContext = createContext<GameContextState>(initialState);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameProvider must be used within a GameProvider");
  }
  return context;
};
