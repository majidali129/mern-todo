import express from 'express';

import {
  registerUser,
  verifyEmail,
  resendEmailVerification,
  login,
  logout,
  forgotPassword,
  resetForgottenPassword,
  changeCurrentPassword,
  updateCurrentUserProfile,
  getCurrentUser,
} from '../controllers/auth.controller.js';
import { verifyJWT } from '../middlewares/verifyJWT.middleware.js';

import {
  userForgotPasswordValidator,
  registerUserValidator,
  loginUserValidator,
  userChangeCurrentPasswordValidator,
  userResetForgottenPasswordValidator,
} from '../validators/user.validator.js';
import { validate } from '../validators/validate.validator.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();

router
  .route('/register')
  .post(upload.single('avatar'), registerUserValidator(), validate, registerUser);
router.route('/login').post(loginUserValidator(), validate, login);
router
  .route('/forgot-password')
  .post(userForgotPasswordValidator(), validate, forgotPassword);
router
  .route('/reset-password/:resetToken')
  .post(userResetForgottenPasswordValidator(), validate, resetForgottenPassword);
router.route('/refresh-token').post(loginUserValidator(), validate, login);
router.route('/verify-email/:verificationToken').get(verifyEmail);

router.use(verifyJWT);

router.route('/logout').post(logout);
router.route('/update-profile').patch(updateCurrentUserProfile);
router.route('/current-user').get(getCurrentUser);
router
  .route('/change-password')
  .post(userChangeCurrentPasswordValidator(), validate, changeCurrentPassword);
router.route('/resend-email-verification').post(resendEmailVerification);

export default router;
