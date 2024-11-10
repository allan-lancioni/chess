import { useContext, useState } from "react";
import { GameContext } from "..";
import { Move, Square } from "chess.js";

export function useAvailableMoves() {
  const [moves, setMoves] = useState<Move[]>([]);
  const { moves: chessMoves } = useContext(GameContext);
  
  const chooseSquare = (square: Square): void => {
    const availableMoves = chessMoves({ square, verbose: true });
    setMoves(availableMoves);
  }

  return { moves, chooseSquare };
}