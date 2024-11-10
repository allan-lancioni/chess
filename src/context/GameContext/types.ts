import { Color, PieceSymbol, Square } from "chess.js";

export type BoardSquare = {
  square: Square;
  type: PieceSymbol;
  color: Color;
};

export const actionTypes = {
  MOVE: "MOVE",
  RESET: "RESET",
};
