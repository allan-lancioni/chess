import invariant from "tiny-invariant";
import { Board, BoardWithoutImage } from "./types";
import { getPieceImage } from "./utils/getPieceImage";

export function getBoardWithImage(board: BoardWithoutImage): Board {
 
  return board.map((row) => {
    return row.map((square) => {
      if (!square) return null;
      const image = getPieceImage({ type: square.type, color: square.color });
      invariant(image, `Image not found for ${JSON.stringify(square)}`);
      return {
        ...square,
        image,
      };
    });
  });  

}