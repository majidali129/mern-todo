import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { ChangeEvent, useRef, useState } from "react";
import Label from "../../ui/label";

type priorityType = "Easy" | "Mid" | "Hard";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<string>("");
  const [priority, setPriority] = useState<priorityType | null>(null);
  const [tags, setTags] = useState<string[] | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const handlePriority = (event: ChangeEvent<HTMLInputElement>) => {
    setPriority(event.target.value as priorityType);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ title, date, priority, tags });

    setTitle("");
    setDate("");
    setPriority(null);
    setTags([""]);
  };
  return (
    <Form heading="Add New Todo" onSubmit={handleSubmit} ref={formRef}>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        name="title"
        type="text"
        label="Todo Title"
      />
      <Input
        value={date}
        onChange={(e) => setDate(e.target.value)}
        name="date"
        type="date"
        label="Date"
      />
      <Input
        value={tags?.join(" ")}
        onChange={(e) => setTags(e.target.value.split(" "))}
        name="tags"
        type="text"
        label="Tags"
      />

      <div>
        <Label label="Priority" htmlFor="priority" />
        <div className="flex items-center justify-between ">
          <Input
            type="radio"
            label="Easy"
            name="priority"
            value="Easy"
            onChange={(e) => handlePriority(e)}
            checked={priority === "Easy"}
          />
          <Input
            type="radio"
            label="Mid"
            name="priority"
            value="Mid"
            onChange={(e) => handlePriority(e)}
            checked={priority === "Mid"}
          />
          <Input
            type="radio"
            label="Hard"
            name="priority"
            value="Hard"
            onChange={(e) => handlePriority(e)}
            checked={priority === "Hard"}
          />
        </div>
      </div>

      <div className="flex flex-col py-2">
        <div className="flex justify-end">
          <Button type="submit" classname="w-fit">
            Add
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default AddTodo;
