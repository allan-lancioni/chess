import { BISHOP, KING, KNIGHT, PAWN, QUEEN, ROOK, WHITE } from "chess.js";
import BlackBishop from "/src/assets/pieces/bb.png";
import BlackKing from "/src/assets/pieces/bk.png";
import BlackKnight from "/src/assets/pieces/bn.png";
import BlackPawn from "/src/assets/pieces/bp.png";
import BlackQueen from "/src/assets/pieces/bq.png";
import BlackRook from "/src/assets/pieces/br.png";
import WhiteBishop from "/src/assets/pieces/wb.png";
import WhiteKing from "/src/assets/pieces/wk.png";
import WhiteKnight from "/src/assets/pieces/wn.png";
import WhitePawn from "/src/assets/pieces/wp.png";
import WhiteQueen from "/src/assets/pieces/wq.png";
import WhiteRook from "/src/assets/pieces/wr.png";
import { BoardSquare } from "../types";
import invariant from "tiny-invariant";

export const PIECES_IMG = {
  BlackBishop,
  BlackKing,
  BlackKnight,
  BlackPawn,
  BlackQueen,
  BlackRook,
  WhiteBishop,
  WhiteKing,
  WhiteKnight,
  WhitePawn,
  WhiteQueen,
  WhiteRook,
};

export function getPieceImage({
  type,
  color,
}: Pick<BoardSquare, "color" | "type">): string | undefined {
  switch (type) {
    case BISHOP:
      return color === WHITE ? PIECES_IMG.WhiteBishop : PIECES_IMG.BlackBishop;
    case KING:
      return color === WHITE ? PIECES_IMG.WhiteKing : PIECES_IMG.BlackKing;
    case KNIGHT:
      return color === WHITE ? PIECES_IMG.WhiteKnight : PIECES_IMG.BlackKnight;
    case PAWN:
      return color === WHITE ? PIECES_IMG.WhitePawn : PIECES_IMG.BlackPawn;
    case QUEEN:
      return color === WHITE ? PIECES_IMG.WhiteQueen : PIECES_IMG.BlackQueen;
    case ROOK:
      return color === WHITE ? PIECES_IMG.WhiteRook : PIECES_IMG.BlackRook;
    default:
      invariant(`Image not found for piece ${type} ${color}`);
  }
}
