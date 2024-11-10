import { Move } from "chess.js";
import { ReducerAction } from "./types";

const contextActions = (dispatch: React.Dispatch<ReducerAction>) => {
  const move = (data: Move) => dispatch({ type: "MOVE", data });
  const reset = () => dispatch({ type: "RESET", data: null });

  return { move, reset };
};

export default contextActions;
