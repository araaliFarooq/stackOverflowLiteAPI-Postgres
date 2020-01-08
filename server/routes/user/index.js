import { Router } from 'express';
import { UserMiddleware, SecureRoute, UserValidations } from '../../middleware';
import UserView from './user-view';

const userRouter = Router();

userRouter.get('', UserView.getAllUserRecords);

userRouter.post(
  '',
  UserMiddleware.validateCreateUser,
  UserView.getAllUserRecords
);

userRouter.post(
  '/register',
  UserMiddleware.validateCreateUser,
  UserView.registerUser
);

userRouter.post('/confirmation/:token', UserView.confirmEmail);

userRouter.post('/login', UserMiddleware.validateUserLogin, UserView.loginUser);

userRouter.get('/me', SecureRoute.loginRequired, UserView.getUserProfile);

userRouter.get(
  '/google',
  UserValidations.validateAccessToken,
  UserView.googleAuthentication
);

userRouter.get(
  '/facebook',
  UserValidations.validateAccessToken,
  UserView.faceBookAuthentication
);

export default userRouter;
