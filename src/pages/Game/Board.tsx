import { useEffect, useState } from "react";
import CanvasBoard from "./CanvasBoard";
import { useGameContext } from "../../context/GameContext";
import { getBoardSquare } from "../../context/GameContext/utils/getBoardSquare";
import { BLACK, Square } from "chess.js";

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
  const [squareSize, setSquareSize] = useState(0);
  const { board, playerColor } = useGameContext();
  const boardHeightOffset = 100;

  const rows: number[] = Array.from(baseArray).reverse();
  const cols: string[] = Array.from(baseArray).map((row) =>
    String.fromCharCode(96 + row)
  );

  console.log(board, playerColor);

  if (playerColor === BLACK) {
    rows.reverse();
    cols.reverse();
  }

  useEffect(() => {
    const handleResize = () => {
      const { width, height } =
        boardContainerRef.current?.getBoundingClientRect() || {
          width: 0,
          height: 0,
        };
      const _boardSize = Math.min(width, height - boardHeightOffset);
      setBoardSize(_boardSize);
      setSquareSize(_boardSize / 8);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [boardContainerRef]);

  if (!boardSize) return null;

  return (
    <section className="relative rounded overflow-hidden">
      <div
        data-testid="board"
        style={getSquareSize(boardSize)}
        className="grid grid-cols-8 gap-0  shadow relative z-10"
      >
        {rows.map((row) =>
          cols.map((col) => {
            const squareName = `${col}${row}` as Square;
            const square = getBoardSquare(board, squareName);
            const style: Pick<React.CSSProperties, "background"> = {}
            if (square?.image) {
              style.background = `url("${square.image}") center/cover no-repeat`;
            }
            return (
              <div
                data-testid="square"
                data-square={`${col}${row}`}
                key={`square_${col + row}`}
                style={{
                  ...getSquareSize(squareSize),
                  ...style,
                }}
              ></div>
            );
          })
        )}
      </div>
      <CanvasBoard canvasWidth={boardSize} />
    </section>
  );
}

export default Board;
