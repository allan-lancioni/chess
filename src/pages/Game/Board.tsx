import { useEffect, useState } from "react";
import Pieces from "./Pieces";
import CanvasBoard from "./CanvasBoard";

type SquareSize = { width: number; height: number };

const baseArray = [1, 2, 3, 4, 5, 6, 7, 8];

const getSquareSize = (value: number): SquareSize => ({
  width: value,
  height: value,
});

type BoardProps = {
  boardContainerRef: React.RefObject<HTMLDivElement>;
  playingAs?: "white" | "black";
};

// TODO: remove this hardcoded piece image logic
function getPieceImage(row: number, col: string): string | null {
  if (row === 2) return Pieces.WhitePawn;
  if (row === 7) return Pieces.BlackPawn;
  if (row === 1 && (col === "a" || col === "h")) return Pieces.WhiteRook;
  if (row === 8 && (col === "a" || col === "h")) return Pieces.BlackRook;
  if (row === 1 && (col === "b" || col === "g")) return Pieces.WhiteKnight;
  if (row === 8 && (col === "b" || col === "g")) return Pieces.BlackKnight;
  if (row === 1 && (col === "c" || col === "f")) return Pieces.WhiteBishop;
  if (row === 8 && (col === "c" || col === "f")) return Pieces.BlackBishop;
  if (row === 1 && col === "d") return Pieces.WhiteQueen;
  if (row === 8 && col === "d") return Pieces.BlackQueen;
  if (row === 1 && col === "e") return Pieces.WhiteKing;
  if (row === 8 && col === "e") return Pieces.BlackKing;
  return null;
}

function Board({ boardContainerRef, playingAs = "white" }: BoardProps) {
  const [boardSize, setBoardSize] = useState(0);
  const [squareSize, setSquareSize] = useState(0);
  const boardHeightOffset = 100;

  const rows: number[] = Array.from(baseArray).reverse();
  const cols: string[] = Array.from(baseArray).map((row) =>
    String.fromCharCode(96 + row)
  );

  if (playingAs === "black") {
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
  const getPieceImageStyle = (
    row: number,
    col: string
  ): Pick<React.CSSProperties, "background"> => {
    const pieceImage = getPieceImage(row, col);
    return pieceImage
      ? { background: `url("${getPieceImage(row, col)}") center/cover` }
      : {};
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
            return (
              <div
                data-testid="square"
                data-square={`${col}${row}`}
                key={`square_${col + row}`}
                style={{
                  ...getSquareSize(squareSize),
                  ...getPieceImageStyle(row, col),
                }}
              ></div>
            );
          })
        )}
      </div>
      <CanvasBoard canvasWidth={boardSize} playingAs={playingAs} />
    </section>
  );
}

export default Board;
