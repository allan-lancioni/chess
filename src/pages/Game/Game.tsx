import { useRef } from "react";
import Board from "./Board";

function Game() {
  const boardContainer = useRef<HTMLDivElement>(null);

  return (
    <section className="grid md:grid-cols-3 gap-4 h-screen">
      <div className="md:col-span-2 bg-gray-400 flex items-center justify-center" ref={boardContainer}> 
        <Board boardContainerRef={boardContainer} />
      </div>
      <RightColumn />
    </section>
  );
}

function RightColumn() {
  return (
    <div className="hidden md:block col-span-1 bg-gray-600 p-4">
      <div className="rounded bg-base-800 h-full"></div>
    </div>
  );
}

export default Game