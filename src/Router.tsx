import { createBrowserRouter, Link } from "react-router-dom";
import App from "./pages/Root";
import Game from "./pages/Game/Game";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <section className="flex flex-col h-screen justify-center items-center">
            <h1 className="text-4xl m-4">Home</h1>
            <Link to="game" className="text-3xl text-primary-400 hover:text-primary-300">Play Game</Link>
          </section>
        )
      },
      {
        path: "game",
        element: <Game />
      },
    ]
  },
]);

export default router