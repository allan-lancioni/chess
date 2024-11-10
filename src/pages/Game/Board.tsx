import { useEffect, useMemo, useState } from "react";
import CanvasBoard from "./CanvasBoard";
import { useGameContext } from "../../context/GameContext";
import { BLACK, Move, Square } from "chess.js";
import { useAvailableMoves } from "../../context/GameContext/hooks/useMoves";
import { getPieceImage } from "../../context/GameContext/utils/getPieceImage";
import { Board as TBoard, BoardSquare } from "../../context/GameContext/types";
import styles from "./Board.module.css";

type SquareSize = { width: number; height: number };

const baseArray = [1, 2, 3, 4, 5, 6, 7, 8];

type BoardProps = {
  boardContainerRef: React.RefObject<HTMLDivElement>;
};

function Board({ boardContainerRef }: BoardProps) {
  const [boardSize, setBoardSize] = useState(0);
  const squareSize = useMemo(() => boardSize / 8, [boardSize]);
  const { board, playerColor, move } = useGameContext();
  const { selectedSquare, moves, chooseSquare } = useAvailableMoves();
  const boardHeightOffset = 100;

  const rows: number[] = Array.from(baseArray).reverse();
  const cols: string[] = Array.from(baseArray).map((row) =>
    String.fromCharCode(96 + row),
  );

  if (playerColor === BLACK) {
    rows.reverse();
    cols.reverse();
  }

  useEffect(() => {
    const handleResize = () => {
      const size =
        boardContainerRef.current?.getBoundingClientRect() || getSquareSize(0);
      const _boardSize = Math.min(size.width, size.height - boardHeightOffset);
      setBoardSize(_boardSize);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [boardContainerRef]);

  if (!boardSize) return null;

  const handleClick = (square: Square) => {
    const availableMove = moves.find((move) => move.to === square);
    if (availableMove) {
      chooseSquare(null);
      move(availableMove);
      return;
    }
    if (!square) return;
    chooseSquare(square);
  };

  return (
    <section className="relative rounded overflow-hidden">
      <div
        data-testid="board"
        style={getSquareSize(boardSize)}
        className="grid grid-cols-8 gap-0  shadow relative z-10"
      >
        {rows.map((row) =>
          cols.map((col) => {
            const square = `${col}${row}` as Square;
            const squareContent = getSquareContent(board, square);
            const availableMove = getAvailableMove(square, moves);
            return (
              <div
                data-testid="square"
                data-square={square}
                data-is-selected={selectedSquare === square}
                data-available-move={availableMove}
                onClick={() => handleClick(square)}
                key={"square_" + square}
                className={styles.boardSquare}
                style={{
                  ...getSquareSize(squareSize),
                  ...getSquareStyle(squareContent),
                }}
              ></div>
            );
          }),
        )}
      </div>
      <CanvasBoard canvasWidth={boardSize} />
    </section>
  );
}

function getSquareContent(board: TBoard, square: Square): BoardSquare | null {
  return board.flat().find((s) => s?.square === square) as BoardSquare | null;
}

function getSquareStyle(bsq: BoardSquare | null) {
  const style: Partial<React.CSSProperties> = {};
  if (bsq) {
    const image = getPieceImage(bsq);
    style.backgroundImage = `url("${image}")`;
    style.backgroundSize = "cover";
  }
  return style;
}

function getSquareSize(value: number): SquareSize {
  return { width: value, height: value };
}

type PossibleMove = "move" | "capture" | null;
function getAvailableMove(square: Square, moves: Move[]): PossibleMove {
  const move = moves.find((m) => m.to === square);
  if (!move) return null;
  return move.captured ? "capture" : "move";
}

export default Board;
