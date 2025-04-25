import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/appError';
import { IUser } from './user.interface';
import { User } from './user.model';

const registrationUserIntoDB = async (payload: IUser) => {
  const isUserExists = await User.findOne({
    email: payload.email,
  });
  // if the checking user is exist into bd
  if (isUserExists) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'This email address is already exists',
    );
  }
  // create user into db
  const result = await User.create(payload);
  return result;
};

export const UserService = {
  registrationUserIntoDB,
};
