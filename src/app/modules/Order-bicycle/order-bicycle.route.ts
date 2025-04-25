import express from 'express';
import { bicycleOrderController } from './order-bicycle.controller';
import auth from '../../middlewares/auth';
import { User_Role } from '../user/user.constant';
import validationRequest from '../../middlewares/validationRequest';
import { orderValidationSchema } from './order-bicycle.validation';


const router = express.Router();
// create post
router.post(
  '/',
  auth(User_Role.customer, User_Role.admin),
  validationRequest(orderValidationSchema),
  bicycleOrderController.createBicycleOrder,
);
//order verify route
router.get(
  '/verify',
  auth(User_Role.customer),
  bicycleOrderController.verifyPayment,
);
router.get('/', auth(User_Role.customer, User_Role.admin), bicycleOrderController.getOrder);
//total revenue
router.get(
  '/revenue',
  auth(User_Role.admin, User_Role.customer),
  bicycleOrderController.getTotalRevenue,
);
export const bicyclOrderRouter = router;
