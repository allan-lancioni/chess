import { useEffect, useRef } from "react";
import { useGameContext } from "../../context/GameContext";
import { BLACK } from "chess.js";

const baseArray = [1, 2, 3, 4, 5, 6, 7, 8];

type CanvasBoardProps = {
  canvasWidth: number;
};
function CanvasBoard({ canvasWidth }: CanvasBoardProps) {
  const boardSize = 8;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { playerColor } = useGameContext();

  useEffect(() => {
    const squareSize = canvasWidth / boardSize;
    const canvas = canvasRef.current;
    const lightColor = "#e7e5e4";
    const darkColor = "#78716c";
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    canvas.width = canvasWidth;
    canvas.height = canvasWidth;

    baseArray.forEach((_, rowIndex) => {
      baseArray.forEach((_, colIndex) => {
        const isDarkSquare = (rowIndex + colIndex) % 2 === (playerColor === BLACK ? 0 : 1);
        ctx.fillStyle = isDarkSquare ? darkColor : lightColor; // Alternate colors
        ctx.font = "14px Arial";
        ctx.fillRect(
          colIndex * squareSize,
          rowIndex * squareSize,
          squareSize,
          squareSize
        );

        // Add row and column labels on the edges
        if (rowIndex === boardSize - 1) {
          ctx.fillStyle = isDarkSquare ? lightColor : darkColor;
          ctx.fillText(
            String.fromCharCode(96 + colIndex),
            colIndex * squareSize + squareSize - 12,
            canvas.height - 4
          );
        }
        if (colIndex === 0) {
          ctx.fillStyle = isDarkSquare ? lightColor : darkColor;
          const label = (boardSize - rowIndex).toString();
          ctx.fillText(label, 4, rowIndex * squareSize + 16);
        }
      });
    });
  }, [canvasWidth, playerColor]);

  return <canvas ref={canvasRef} className="z-0 absolute top-0" />;
}

export default CanvasBoard;