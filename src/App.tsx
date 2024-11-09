import { useRef } from "react";
import Board from "./Board";

function App() {
  const boardContainer = useRef<HTMLDivElement>(null);

  return (
    <main className="grid md:grid-cols-6 gap-4 h-screen">
      <Sidebar />
      <div className="md:col-span-3 bg-gray-400 flex items-center justify-center" ref={boardContainer}> 
        <Board boardContainerRef={boardContainer} />
      </div>
      <RightColumn />
    </main>
  );
}

function Sidebar() {
  return (
    <aside className="hidden md:block col-span-1 bg-base-950 text-white p-4">
      <h2 className="text-lg font-semibold mb-4">Sidebar</h2>
      <ul className="space-y-2">
        <li>
          <a href="#" className="block hover:bg-gray-700 p-2 rounded">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="block hover:bg-gray-700 p-2 rounded">
            About
          </a>
        </li>
        <li>
          <a href="#" className="block hover:bg-gray-700 p-2 rounded">
            Services
          </a>
        </li>
        <li>
          <a href="#" className="block hover:bg-gray-700 p-2 rounded">
            Contact
          </a>
        </li>
      </ul>
    </aside>
  );
}

function RightColumn() {
  return (
    <div className="hidden md:block col-span-2 bg-gray-600 p-4">
      <div className="rounded bg-base-800 h-full"></div>
    </div>
  );
}

export default App;
