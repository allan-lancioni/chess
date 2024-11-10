
import { useReducer, useRef } from "react";
import { GameContext, GameContextState, initialState } from ".";
import { gameReducer } from "./reducer";
import { Chess } from "chess.js";
import { getBoardWithImage } from "./actions";

function GameProvider({ children }: { children: React.ReactNode }) {
  const chess = useRef(new Chess())
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const board = getBoardWithImage(chess.current.board());

  const newState: GameContextState = { 
    ...state,
    fen: chess.current.fen,
    board,
    dispatch
  }

  return (
    <GameContext.Provider value={newState}>
      {children}
    </GameContext.Provider>
  );
};

export { GameProvider };