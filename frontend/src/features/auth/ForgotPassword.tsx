import { FormEvent, useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);

    setEmail("");
  };
  return (
    <Form heading="Forgot Password" onSubmit={handleSubmit}>
      <Input
        name="email"
        type="email"
        label="Email Address"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <div className="flex justify-end py-2">
        <Button type="submit">Fargot</Button>
      </div>
    </Form>
  );
};

export default ForgotPassword;
