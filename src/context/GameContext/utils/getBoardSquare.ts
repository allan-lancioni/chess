import { Square } from "chess.js";
import { Board } from "../types";

export function getBoardSquare(board: Board, square: Square) {
  return board.flat().find((s) => s?.square === square);
}