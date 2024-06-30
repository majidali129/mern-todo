import jwt, { decode } from 'jsonwebtoken';

import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from '../utils/apiError.js';
import { User } from '../models/user.model.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req?.cookies?.accessToken ||
    (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
  ) {
    token = req.cookies.accessToken || req.headers.authorization.split(' ')[1];
  }

  if (!token) return next(new apiError(401, 'Invalid access token. Login please'));

  const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decoded._id).select('-password -refreshToken ');

  if (!user)
    return next(new apiError(401, 'Invalid access token. Login to get access'));

  req.user = user;
  next();
});
