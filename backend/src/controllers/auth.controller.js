import crypto from 'crypto';

import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from '../utils/apiError.js';
import { apiResponse } from '../utils/apiResponse.js';
import { User } from '../models/user.model.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';
import { emailVerificationMailgenContent, sendEmail } from '../utils/mail.js';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
};

const generateAccessRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    // attach refresh token to the user document to avoid refreshing the access token with multiple refresh tokens
    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(
      500,
      'Something went wrong while generating the access token'
    );
  }
};

const registerUser = asyncHandler(async (req, res, next) => {
  const { email, name } = req.body;

  const existingUser = await User.findOne({
    $or: [{ email }, { name }],
  });

  if (existingUser)
    return next(new apiError(400, 'user with credentials already exists'));

  const userAvatarLocalPath = req?.file?.path;
  if (!userAvatarLocalPath)
    return next(new apiError(404, 'user avatar is required for profile purposes.'));

  const avatar = await uploadToCloudinary(userAvatarLocalPath);

  const user = await User.create({ ...req.body, avatar: avatar?.url });

  /**
   * !unHashedToken: unHashed token is something we will send to the user's mail
   *!hashedToken: we will keep record of hashedToken to validate the unHashedToken in verify email controller
   * !tokenExpiry: Expiry to be checked before validating the incoming token
   */

  const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken();

  /**
   * assign hashedToken and tokenExpiry in DB till user clicks on email verification link
   * The email verification is handled by {@link verifyEmail}
   */

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  await sendEmail({
    email: user?.email,
    subject: 'Please verify you email',
    mailgenContent: emailVerificationMailgenContent(
      user.name,
      `${req.protocol}://${req.get(
        'host'
      )}/api/v1/users/verify-email/${unHashedToken}`
    ),
  });

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken -emailVerificationToken -emailVerificationExpiry'
  );

  if (!createdUser)
    return next(
      new apiError(
        500,
        'something went wrong while creating new user. try again later'
      )
    );

  res
    .status(201)
    .json(
      new apiResponse(
        201,
        { user: createdUser },
        'Users registered successfully and verification email has been sent on your email.'
      )
    );
});

const verifyEmail = asyncHandler(async (req, res, next) => {
  const { verificationToken } = req.params;

  if (!verificationToken)
    return next(new apiError(400, 'Email verification token is missing'));

  const hashedToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new apiError(489, 'Token is invalid or expired');
  }

  user.emailVerificationToken = undefined;
  user.emailVerificationExpiry = undefined;

  user.isEmailVerified = true;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new apiResponse(200, { isEmailVerified: true }, 'Email is verified'));
});

const resendEmailVerification = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user?._id);
  if (!user) return next(new apiError(404, 'User does not exist', []));

  if (user.isEmailVerified)
    return next(new apiError(409, 'Email is already verified'));

  const { hashedToken, unHashedToken, tokenExpiry } = user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  await sendEmail({
    email: user?.email,
    subject: 'Please verify your email',
    mailgenContent: emailVerificationMailgenContent(
      user.username,
      `${req.protocol}://${req.get(
        'host'
      )}/api/v1/users/verify-email/${unHashedToken}`
    ),
  });

  return res
    .status(200)
    .json(new apiResponse(200, {}, 'Mail has been sent to your mail ID'));
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new apiError(404, 'user not found. please signup first'));

  if (!user.isEmailVerified)
    return next(new apiError(401, 'please verify your email to proceed'));

  const isPassCorrect = await user.isPasswordCorrect(password);
  if (!isPassCorrect) return next(new apiError(401, 'email or password is invalid'));

  const { accessToken, refreshToken } = await generateAccessRefreshToken(user._id);
  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken -emailVerificationToken -emailVerificationExpiry'
  );

  res
    .status(200)
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json(
      new apiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        'user logged In!!!'
      )
    );
});

const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new apiError(404, 'User does not exists', []));

  // Generate a temporary token
  const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken(); // generate password reset creds

  // save the hashed version a of the token and expiry in the DB
  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordExpiry = tokenExpiry;
  await user.save({ validateBeforeSave: false });

  await sendEmail({
    email: user?.email,
    subject: 'Password reset request',
    mailgenContent: forgotPasswordMailgenContent(
      user.username,
      // ! NOTE: Following link should be the link of the frontend page responsible to request password reset
      // ! Frontend will send the below token with the new password in the request body to the backend reset password endpoint
      `${process.env.FORGOT_PASSWORD_REDIRECT_URL}/${unHashedToken}`
    ),
  });

  return res
    .status(200)
    .json(
      new apiResponse(200, {}, 'Password reset mail has been sent on your mail id')
    );
});

const resetForgottenPassword = asyncHandler(async (req, res, _) => {
  const { newPassword } = req.body;
  const { resetToken } = req.params;

  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // See if user with hash similar to resetToken exists
  // If yes then check if token expiry is greater than current date
  const user = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  // If either of the one is false that means the token is invalid or expired
  if (!user) {
    throw new apiError(489, 'Token is invalid or expired');
  }

  // if everything is ok and token id valid
  // reset the forgot password token and expiry
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  // Set the provided password as the new password
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new apiResponse(200, {}, 'Password reset successfully'));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  console.log(user);

  // check the old password
  const isPasswordValid = await user.isPasswordCorrect(oldPassword, user.password);

  if (!isPasswordValid) {
    throw new apiError(400, 'Invalid old password');
  }

  // assign new password in plain text
  // We have a pre save method attached to user schema which automatically hashes the password whenever added/modified
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new apiResponse(200, {}, 'Password changed successfully'));
});

const updateCurrentUserProfile = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;

  if (req.body.password)
    return next(
      new apiError(
        400,
        'here you are not allow to update password. please viset /users/change-password to update password accordingly'
      )
    );

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        name,
        email,
      },
    },
    {
      new: true,
    }
  ).select(
    '-password -refreshToken -emailVerificationToken -emailVerificationExpiry'
  );
  if (!user) return next(new apiError(404, 'User does not exist', []));

  res.status(200).json(new apiResponse(200, user, 'profile updated successfully'));
});

const getCurrentUser = asyncHandler(async (req, res, _) => {
  res
    .status(200)
    .json(
      new apiResponse(200, req.user, 'current user profile fetched successfully')
    );
});

const logout = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: '',
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .clearCookie('accessToken', cookieOptions)
    .clearCookie('refreshToken', cookieOptions)
    .json(new apiResponse(200, {}, 'User logged out'));
});

export {
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
};
