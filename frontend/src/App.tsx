// import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import SignUp from "./features/auth/SignUp";
import axios from "axios";
import { todoType } from "./types";
// import ForgotPassword from "./features/auth/ForgotPassword";
// import Login from "./features/auth/Login";
// import UpdatePassword from "./features/auth/UpdatePassword";

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
    <div>
      <SignUp />{" "}
    </div>
  );
};

export default App;
