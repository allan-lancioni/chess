import { useEffect, useMemo, useState } from "react";
import CanvasBoard from "./CanvasBoard";
import { useGameContext } from "../../context/GameContext";
import { BLACK, Square } from "chess.js";
import { useAvailableMoves } from "../../context/GameContext/hooks/useMoves";
import { getPieceImage } from "../../context/GameContext/utils/getPieceImage";
import { BoardSquare } from "../../context/GameContext/types";

type SquareSize = { width: number; height: number };

const baseArray = [1, 2, 3, 4, 5, 6, 7, 8];

const getSquareSize = (value: number): SquareSize => ({
  width: value,
  height: value,
});

type BoardProps = {
  boardContainerRef: React.RefObject<HTMLDivElement>;
};

function Board({ boardContainerRef }: BoardProps) {
  const [boardSize, setBoardSize] = useState(0);
  const squareSize = useMemo(() => boardSize / 8, [boardSize]);
  const { board, playerColor } = useGameContext();
  const boardHeightOffset = 100;
  const { moves, chooseSquare } = useAvailableMoves();

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

  const handleClick = (square: Square, isAvailableMove: boolean) => {
    if (isAvailableMove) {
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
            const squareContent = board
              .flat()
              .find((s) => s?.square === square) as BoardSquare | null;
            const isAvailableMove = moves.some((move) => move.to === square);
            const style: Pick<React.CSSProperties, "background"> = {};
            if (squareContent) {
              const image = getPieceImage(squareContent);
              style.background = `url("${image}") center/cover no-repeat`;
            }
            return (
              <div
                data-testid="square"
                data-square={square}
                onClick={() => handleClick(square, isAvailableMove)}
                key={"square_" + square}
                className="flex items-center justify-center"
                style={{
                  ...getSquareSize(squareSize),
                  ...style,
                }}
              >
                {isAvailableMove && (
                  <div className="h-[30%] w-[30%] rounded-full bg-base-950 opacity-20"></div>
                )}
              </div>
            );
          }),
        )}
      </div>
      <CanvasBoard canvasWidth={boardSize} />
    </section>
  );
}

export default Board;
