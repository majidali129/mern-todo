import express from 'express';

import {
  createTodo,
  updateTodo,
  deleteTodo,
  getAllTodos,
  getTodoDetails,
} from '../controllers/todo.controller.js';
import { verifyJWT } from '../middlewares/verifyJWT.middleware.js';
import {
  createTodoValidator,
  updateTodoValidator,
} from '../validators/todo.validator.js';
import { validate } from '../validators/validate.validator.js';
import { mongodbIdFromPathValidator } from '../validators/mongodb.validator.js';

const router = express.Router();

// router.use(verifyJWT);

router.route('/').get(getAllTodos).post(createTodoValidator(), createTodo);
router
  .route('/:todoId')
  .patch(updateTodoValidator(), validate, updateTodo)
  .get(mongodbIdFromPathValidator('todoId'), validate, getTodoDetails)
  .delete(mongodbIdFromPathValidator('todoId'), validate, deleteTodo);

export default router;
