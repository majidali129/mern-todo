import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from '../utils/apiError.js';
import { apiResponse } from '../utils/apiResponse.js';
import { Todo } from '../models/todo.model.js';

const createTodo = asyncHandler(async (req, res, next) => {
  const { title, date, tags, priority } = req.body;
  const existingTodo = await Todo.findOne({
    $or: [{ title }, { date }],
  });
  if (existingTodo)
    return next(new apiError(400, 'Same todo already exists in record'));

  const createdTodo = await Todo.create({ title, date, tags, priority });
  if (!createdTodo)
    return next(
      new apiError(500, 'facing issue while creating new todo. try again later')
    );

  res
    .status(201)
    .json(
      new apiResponse(201, { todo: createdTodo }, 'new todo created successfully')
    );
});
const updateTodo = asyncHandler(async (req, res, next) => {
  const { title, date, tags, priority } = req.body;

  const todo = await Todo.findByIdAndUpdate(
    req.params.todoId,
    {
      $set: {
        title,
        date,
        priority,
        tags,
      },
    },
    { new: true }
  );
  if (!todo) return next(new apiError(404, 'No todo found for that ID'));

  res
    .status(200)
    .json(new apiResponse(200, { todo: todo }, 'todo updated successfully'));
});
const deleteTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findByIdAndDelete(req.params.todoId);
  if (!todo) return next(new apiError(404, 'No todo found for that ID'));

  res.status(200).json(new apiResponse(200, {}, 'todo deleted successfully'));
});

const getAllTodos = asyncHandler(async (req, res, next) => {
  const todos = await Todo.find();

  res
    .status(200)
    .json(
      new apiResponse(
        200,
        { results: todos.length, todos },
        'all todos fetched successfully'
      )
    );
});

const getTodoDetails = asyncHandler(async (req, res, next) => {
  console.log(req.params);
  const todo = await Todo.findById(req.params.todoId);
  if (!todo) return next(new apiError(404, 'No todo found for that ID'));

  res.status(200).json(new apiResponse(200, { todo }, 'todo fetched successfully'));
});

export { createTodo, updateTodo, deleteTodo, getAllTodos, getTodoDetails };
