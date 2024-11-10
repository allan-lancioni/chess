import { createContext, useContext } from "react";
import { Chess, Color, WHITE } from "chess.js";
import contextActions from "./actions";

export type GameContextState = {
  _chess: Chess;
  playerColor: Color;
  turn: Color;
  board: ReturnType<typeof Chess.prototype.board>;
  moves: typeof Chess.prototype.moves;
  fen: typeof Chess.prototype.fen;
} & ReturnType<typeof contextActions>;

export const initialState: GameContextState = {
  _chess: new Chess(),
  playerColor: WHITE,
  turn: WHITE,
  board: [],
  moves: () => [],
  fen: () => "",
  ...contextActions(() => {}),
};

export const GameContext = createContext<GameContextState>(initialState);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameProvider must be used within a GameProvider");
  }
  return context;
};
