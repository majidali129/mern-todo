const TodoItem = () => {
  return (
    <li className="flex items-center px-1 w-full justify-between bg-gray-200 border py-4">
      <span className="font-bold">Title</span>
      <span className="font-semibold">Completed</span>
      <div className="space-x-1">
        <button className="outline-none border-none bg-[#242424] text-slate-50 py-1 px-1 ">
          Edit
        </button>
        <button className="outline-none border-none bg-[#242424] text-slate-50 py-1 px-1 ">
          Delete
        </button>
        <button className="outline-none border-none bg-[#242424] text-slate-50 py-1 px-1 ">
          Mark Done
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
