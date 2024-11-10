import { Color, Move, PieceSymbol, Square } from "chess.js";

export type BoardSquare = {
  square: Square;
  type: PieceSymbol;
  color: Color;
};

export const actionTypes = {
  MOVE: "MOVE",
  RESET: "RESET",
};

export type ACTION_TYPE = keyof typeof actionTypes;

export type ReducerAction =
  | {
      type: typeof actionTypes.MOVE;
      data: Move;
    }
  | {
      type: typeof actionTypes.RESET;
      data: null;
    };
