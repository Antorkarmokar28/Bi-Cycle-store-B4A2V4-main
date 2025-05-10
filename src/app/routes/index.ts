import { Router } from 'express';
import { userRouter } from '../modules/user/user.routes';
import { bicycleRoute } from '../modules/bicycle/bicycle.route';
import { bicyclOrderRouter } from '../modules/Order-bicycle/order-bicycle.route';
import { authRoutes } from '../modules/auth/auth.route';
import { subscribeRouter } from '../modules/subscribe/subscribe.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/bicycles',
    route: bicycleRoute,
  },
  {
    path: '/orders',
    route: bicyclOrderRouter,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/subscribe',
    route: subscribeRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
