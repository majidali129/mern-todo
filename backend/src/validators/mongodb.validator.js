import { param, body } from 'express-validator';

export const mongodbIdFromPathValidator = (idName) => {
  return [
    param(idName)
      .notEmpty()
      .trim()
      .withMessage(`${idName} is required`)
      .isMongoId()
      .withMessage(`Invalid ${idName}`),
  ];
};
export const mongodbIdFromBodyValidator = (idName) => {
  return [
    body(idName)
      .notEmpty()
      .trim()
      .withMessage(`${idName} is required`)
      .isMongoId()
      .withMessage(`Invalid ${idName}`),
  ];
};
