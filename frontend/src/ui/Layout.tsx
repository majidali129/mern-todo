import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";

const Layout = () => {
  const navigate = useNavigate();
  return (
    <main className="bg-zinc-800 flex h-screen">
      <aside className="bg-zinc-900 h-full w-1/4 flex items-center space-y-3 py-3 justify-start flex-col">
        <h2 className="text-white font-bold text-xl ">FastTodo</h2>
        <ul className="flex-col gap-y-3 flex items-center w-full justify-start bg-inherit px-4">
          <li className="text-white text-xl bg-yellow-900 rounded-sm py-1 px-2 w-full text-start">
            <NavLink to="/school">School</NavLink>
          </li>
          <li className="text-white text-xl bg-yellow-900 rounded-sm py-1 px-2 w-full text-start">
            <NavLink to="/projects">Projects</NavLink>
          </li>
          <li className="text-white text-xl bg-yellow-900 rounded-sm py-1 px-2 w-full text-start">
            <NavLink to="/others">Others</NavLink>
          </li>
          <Button
            type="button"
            classname="bg-yellow-900 w-full hover:bg-yellow-950"
            onClick={() => navigate("/add-todo")}
          >
            Add Todo
          </Button>
        </ul>
      </aside>
      <section className="w-full"></section>
      <aside className="bg-zinc-900 h-full w-1/3"></aside>
    </main>
  );
};

export default Layout;
