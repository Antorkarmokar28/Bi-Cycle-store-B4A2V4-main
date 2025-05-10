import { StatusCodes } from 'http-status-codes';
import catchAsynch from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SubscribeService } from './subscribe.service';

const subscribe = catchAsynch(async (req, res) => {
  const result = await SubscribeService.subscribeIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Subscribe is successfull',
    data: result,
  });
});

const getAllSubscribe = catchAsynch(async (req, res) => {
  const result = await SubscribeService.getAllSubscribeFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Subscribe retrieved successfully',
    data: result,
  });
});

export const SubscribeController = {
  subscribe,
  getAllSubscribe,
};
