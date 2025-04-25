import { Request, Response } from 'express';
import { orderBicycleService } from './order-bicycle.service';
import catchAsynch from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
// This function manage request and response for post order data into mongodb database
const createBicycleOrder = catchAsynch(async (req, res) => {
  const user = req.user;  
  const payload = req.body;
  const result = await orderBicycleService.createBicycleOrderIntoDb(
    user,
    payload,
    req.ip!,
  );
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Order is successfull',
    data: result,
  });
});
// This function manage request and response for total revenue of order product data
const getTotalRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await orderBicycleService.calculateTotalRevenue();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: { totalRevenue },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error calculating revenue',
      status: false,
      error,
    });
  }
};

//verify payment controller
const verifyPayment = catchAsynch(async (req, res) => {
  const result = await orderBicycleService.verifyPayment(
    req.query.order_id as string,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order verified successfully',
    data: result,
  });
});

const getOrder = catchAsynch(async (req, res) => {
  const result = await orderBicycleService.getOrdersFromToDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Orde retrieved successfully',
    data: result,
  });
});

export const bicycleOrderController = {
  createBicycleOrder,
  getTotalRevenue,
  verifyPayment,
  getOrder,
};
