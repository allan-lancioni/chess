import { Outlet } from "react-router-dom";
import Sidebar from "../shared/layout/Sidebar";

function App() {

  return (
    <main className="grid md:grid-cols-6 gap-4 h-screen">
      <Sidebar />
      <div className="col-span-5">
        <Outlet />
      </div>
    </main>
  );
}


export default App;
