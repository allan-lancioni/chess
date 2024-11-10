import { useReducer } from "react";
import { GameContext, GameContextState, initialState } from ".";
import { gameReducer } from "./reducer";
import contextActions from "./actions";

function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const actions = contextActions(dispatch);
  const chess = state._chess;

  const newState: GameContextState = {
    ...state,
    ...actions,
    board: chess.board(),
    turn: chess.turn(),
    moves: chess.moves.bind(chess),
    fen: chess.fen.bind(chess),
  };

  return (
    <GameContext.Provider value={newState}>{children}</GameContext.Provider>
  );
}

export { GameProvider };
