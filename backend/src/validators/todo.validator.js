import { body } from 'express-validator';

export const createTodoValidator = () => {
  return [
    body('title').notEmpty().trim().withMessage('todo title is required'),
    body('date').notEmpty().trim().withMessage('date for todo is required'),
    body('tags')
      .notEmpty()
      .withMessage('At least one tag is required')
      .custom((value) => value.every((item) => typeof item === 'string'))
      .withMessage('tags list must contain only strings'),
    body('priority')
      .notEmpty()
      .withMessage('make sure to add priority')
      .custom((value) => value.every((item) => typeof item === 'string'))
      .withMessage('tags list must contain only strings'),
  ];
};

export const updateTodoValidator = () => {
  return [
    body('title').optional().notEmpty().trim().withMessage('todo title is required'),
    body('date')
      .optional()
      .notEmpty()
      .trim()
      .withMessage('date for todo is required'),
    body('tags')
      .optional()
      .notEmpty()
      .withMessage('At least one tag is required')
      .custom((value) => value.every((item) => typeof item === 'string'))
      .withMessage('tags list must contain only strings'),
    body('priority')
      .optional()
      .notEmpty()
      .withMessage('make sure to add priority')
      .custom((value) => value.every((item) => typeof item === 'string'))
      .withMessage('tags list must contain only strings'),
  ];
};
