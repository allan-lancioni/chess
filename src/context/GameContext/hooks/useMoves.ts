import { useContext, useState } from "react";
import { GameContext } from "..";
import { Move, Square } from "chess.js";

export function useAvailableMoves() {
  const [moves, setMoves] = useState<Move[]>([]);
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const { moves: chessMoves } = useContext(GameContext);

  const chooseSquare = (square: Square | null): void => {
    if (!square) {
      setMoves([]);
      setSelectedSquare(null);
      return;
    }
    const availableMoves = chessMoves({ square, verbose: true });
    setMoves(availableMoves);
    setSelectedSquare(square);
  };

  return { selectedSquare, moves, chooseSquare };
}
