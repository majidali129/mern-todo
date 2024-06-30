import { FormEvent, useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";

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
      <div className="flex justify-end py-2">
        <Button type="submit">Login</Button>
      </div>
    </Form>
  );
};

export default Login;
