import { FormEvent, useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password });

    setEmail("");
    setPassword("");
  };

  return (
    <Form heading="Login" onSubmit={handleSubmit}>
      <Input
        value={email}
        name="email"
        type="email"
        label="Email"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <Input
        value={password}
        name="password"
        type="password"
        label="Password"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      <Link to="/forgot-password" className="text-blue-500">
        Forgot Password
      </Link>
      <div className="flex flex-col py-2">
        <div className="flex justify-end">
          <Button type="submit" classname="w-fit">
            Register
          </Button>
        </div>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/Signup" className="text-lg text-blue-400">
            Sign Up
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default Login;
