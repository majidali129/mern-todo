import { useRef, useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ name, email, password, avatar });

    setName("");
    setEmail("");
    setPassword("");
    setAvatar(null);
  };

  return (
    <Form heading="Sign Up" onSubmit={handleSubmit} ref={formRef}>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        name="name"
        type="text"
        label="Name"
      />
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        type="email"
        label="Email"
      />
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        type="password"
        label="Password"
      />
      <Input
        onChange={(e) => setAvatar(e.target.files ? e.target.files[0] : null)}
        name="avatar"
        type="file"
        label="Avatar"
      />
      <div className="flex justify-end py-2">
        <Button type="submit">Register</Button>
      </div>
    </Form>
  );
};

export default SignUp;

/**
 *! onChange: (e: React.ChangeEvent(HTMLInputElement))
 *! onChange: (e: React.MouseEvent(HTMLButtonElement))
 *! setState: (e: React.Dispatch(React.SetStateAction<number | string>))
 *! children: ReactNode
 *! childrenElement: React.JSX.Element
 *! style: React.cssProperties
 *! onChange: React.FormEventHandler(HTMLInputElement)
 *! props & React.ComponentPropsWithoutRef<'button'>
 *! props & React.ComponentPropsWithRef<MyButtonWithForwardRef>
 */
