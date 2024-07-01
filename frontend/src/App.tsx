// import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import SignUp from "./features/auth/SignUp";
import axios from "axios";
import { todoType } from "./types";
import Login from "./features/auth/Login";
import ForgotPassword from "./features/auth/ForgotPassword";
import Layout from "./ui/Layout";
import AddTodo from "./features/todos/AddTodo";

const config = {
  withCredentials: true, // Include credentials in the request
  headers: {
    "Content-Type": "application/json"
  }
};

const App = () => {
  const [todos, setTodos] = useState<todoType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      setError(null);
      try {
        const {
          data: { data }
        } = await axios.get("http://localhost:8001/api/v1/todos/", config);
        if (data) {
          setTodos(data.todos);
        } else {
          setError("Unexpected response structure");
        }
      } catch (err) {
        console.error("Error fetching todos:", err);
        setError("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);
  return (
    // <>
    //   <nav className="flex items-center justify-end gap-x-4 *:border *:border-sky-300">
    //     <li className="list-none">
    //       <NavLink to="/">Todos</NavLink>
    //     </li>
    //     <li className="list-none">
    //       <NavLink to="/signup">Sign Up</NavLink>
    //     </li>
    //     <li className="list-none">
    //       <NavLink to="/login">Login</NavLink>
    //     </li>
    //     <li className="list-none">
    //       <NavLink to="/update-password">Update Password</NavLink>
    //     </li>
    //     <li className="list-none">
    //       <NavLink to="/forgot-password">Forgot Password</NavLink>
    //     </li>
    //   </nav>
    //   <Routes>
    //     <Route index element={<Todos />} />
    //     <Route path="signup" element={<SignUp />} />
    //     <Route path="login" element={<Login />} />
    //     <Route path="update-password" element={<UpdatePassword />} />
    //     <Route path="forgot-password" element={<ForgotPassword />} />
    //   </Routes>
    // </>
    <>
      <Routes>
        <Route path="add-todo" element={<AddTodo />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Routes>
      <Layout />
    </>
  );
};

export default App;
