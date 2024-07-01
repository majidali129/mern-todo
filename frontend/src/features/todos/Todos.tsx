import TodoItem from "./TodoItem";

const Todos = () => {
  return (
    <div className="flex items-center justify-center h-[100vh] w-full">
      <ul className="bg-white max-h-96 h-80 overflow-y-scroll px-1 py-3 max-w-[35rem] md:w-full rounded-[3px] flex items-center flex-col gap-y-3 ">
        <TodoItem />
        <TodoItem />
        <TodoItem />
        <TodoItem />
      </ul>
    </div>
  );
};

export default Todos;
