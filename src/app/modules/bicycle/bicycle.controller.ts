import { Request, Response } from 'express';
import { bicycleService } from './bicycle.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsynch from '../../utils/catchAsync';
// This function manage request and response for post data into mongodb database
const createBicycle = catchAsynch(async (req: Request, res: Response) => {
  // receive data in payload from client
  const payload = req.body;
  //validation data using zod
  const result = await bicycleService.createBicycleIntoDB(req.file, payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Bicycle created successfully',
    data: result,
  });
});

// This function manage request and response for get all data from mongodb database
const getAllBicycle = async (req: Request, res: Response) => {
  const query = req.query;
  try {
    const result = await bicycleService.getAllBicyclefromDB(query);
    res.status(200).json({
      message: 'Bicycles retrieved successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Validation failed',
      error,
    });
  }
};

// This function manage request and response for get signle data from mongodb database
const getsingleBicycle = async (req: Request, res: Response) => {
  try {
    // get id from bicycle route
    const { _id } = req.params;
    // this function hit the bicycle service and get a single bicycle data
    const result = await bicycleService.getSingleBicycleFromDB(_id);
    res.status(200).json({
      message: 'Bicycles retrieved successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Validation failed',
      error,
    });
  }
};
// This function manage request and response for update data into mongodb database
const updateBicyclelData = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const updateData = req.body;
    const result = await bicycleService.getUpdateBicycleData(_id, updateData);
    res.status(200).json({
      message: 'Bicycle updated successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Validation failed',
      error,
    });
  }
};
// This function manage request and response for delete data from mongodb database
const deleteBicycleData = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    await bicycleService.getDeleteBicycleData(_id);
    res.status(200).json({
      message: 'Bicycle deleted successfully',
      status: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Validation failed',
      error,
    });
  }
};

// export this object for use another file
export const bicycleController = {
  createBicycle,
  getAllBicycle,
  getsingleBicycle,
  updateBicyclelData,
  deleteBicycleData,
};
