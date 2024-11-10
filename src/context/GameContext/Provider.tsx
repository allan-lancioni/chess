
import { useReducer } from "react";
import { GameContext, initialState } from ".";
import { gameReducer } from "./reducer";

function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameProvider };