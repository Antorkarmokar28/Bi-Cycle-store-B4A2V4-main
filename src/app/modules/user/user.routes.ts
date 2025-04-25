import { Router } from 'express';
import { UserValidationSchema } from './user.validation';
import { UserController } from './user.controller';
import validationRequest from '../../middlewares/validationRequest';

const router = Router();

router.post(
  '/register',
  validationRequest(UserValidationSchema.userRegistrationSchema),
  UserController.registrastionUser,
);

export const userRouter = router;
