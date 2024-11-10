import { Color, PieceSymbol, Square } from "chess.js";

type BoardSquareContent = {
  square: Square;
  type: PieceSymbol;
  color: Color;
  image: string;
}

export type BoardWithoutImage = (Omit<BoardSquareContent, 'image'> | null)[][]
export type Board = (BoardSquareContent | null)[][]