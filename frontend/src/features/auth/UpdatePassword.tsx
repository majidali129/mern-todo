import { FormEvent, useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ oldPassword, newPassword });

    setOldPassword("");
    setNewPassword("");
  };
  return (
    <Form heading="Update Password" onSubmit={handleSubmit}>
      <Input
        name="oldPassword"
        type="password"
        label="Old Password"
        value={oldPassword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setOldPassword(e.target.value)
        }
      />
      <Input
        name="newPassword"
        type="password"
        label="New Password"
        value={newPassword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewPassword(e.target.value)
        }
      />
      <div className="flex justify-end py-2">
        <Button type="submit">Confirm</Button>
      </div>
    </Form>
  );
};

export default UpdatePassword;
