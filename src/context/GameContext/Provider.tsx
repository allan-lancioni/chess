import { useReducer, useRef } from "react";
import { GameContext, GameContextState, initialState } from ".";
import { gameReducer } from "./reducer";
import { Chess } from "chess.js";

function GameProvider({ children }: { children: React.ReactNode }) {
  const chess = useRef(new Chess());
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const newState: GameContextState = {
    ...state,
    board: chess.current.board(),
    turn: chess.current.turn(),
    moves: chess.current.moves.bind(chess.current),
    fen: chess.current.fen.bind(chess.current),
    dispatch,
  };

  return (
    <GameContext.Provider value={newState}>{children}</GameContext.Provider>
  );
}

export { GameProvider };
