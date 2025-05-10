import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { subscribeValidationSchema } from './subscribe.validation';
import { SubscribeController } from './subscribe.controller';

const router = Router();

router.post(
  '/create-subscribe',
  validationRequest(subscribeValidationSchema),
  SubscribeController.subscribe,
);
router.get('/', SubscribeController.getAllSubscribe);

export const subscribeRouter = router;
