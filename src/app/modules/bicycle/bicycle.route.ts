import express, { NextFunction, Request, Response } from 'express';
import { bicycleController } from './bicycle.controller';
import auth from '../../middlewares/auth';
import { User_Role } from '../user/user.constant';
import { upload } from '../../utils/fileUploads';
import validationRequest from '../../middlewares/validationRequest';
import bicycleValidationSchema from './bicycle.validation';
const router = express.Router();
// create post
router.post(
  '/create-bicycle',
  auth(User_Role.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validationRequest(bicycleValidationSchema),
  bicycleController.createBicycle,
);
// get all data
router.get('/', bicycleController.getAllBicycle);
//get a single data
router.get('/:_id', bicycleController.getsingleBicycle);
// update data
router.put('/:_id', bicycleController.updateBicyclelData);
// delete data
router.delete('/:_id', bicycleController.deleteBicycleData);
// export this variable for use another file
export const bicycleRoute = router;
