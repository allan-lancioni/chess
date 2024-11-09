import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="hidden md:block col-span-1 bg-base-950 text-white p-4">
      <Link className="flex space-x-2 items-center mb-2" to="/">
        <div className="rounded-full w-5 h-5 flex justify-center items-center bg-primary-400 text-base-950 text-lg">♘</div>
        <h2 className="text-lg font-semibold text-primary-400">Chess</h2>
      </Link>
      <ul className="space-y-2">
        <li>
          <Link to="/" className="block hover:bg-gray-700 p-2 rounded">
            Home
          </Link>
        </li>
        <li>
          <Link to="game" className="block hover:bg-gray-700 p-2 rounded">
            Game
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
