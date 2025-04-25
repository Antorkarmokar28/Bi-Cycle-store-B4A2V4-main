/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builder/queryBuilder';
import { sendImageCloudinary } from '../../utils/fileUploads';
import { bicycleSearchableFields } from './bicycle.constant';
import { IBicycle } from './bicycle.interface';
import { Bicycle } from './bicycle.model';
// create an bicycle data in the mongodb database
const createBicycleIntoDB = async (file: any, bicycle: IBicycle) => {
  // storage image into cloudinary
  const imageName = bicycle?.name;
  const path = file?.path;
  const { secure_url }: any = await sendImageCloudinary(imageName, path);
  bicycle.image = secure_url;
  const result = await Bicycle.create(bicycle);
  return result;
};
// get all bicycle data from mongodb database
const getAllBicyclefromDB = async (query: Record<string, unknown>) => {
  const bicycleQuery = new QueryBuilder(Bicycle.find(), query)
    .search(bicycleSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await bicycleQuery.modelQuery;
  return result;
};

// get single data from mongodb database
const getSingleBicycleFromDB = async (_id: string) => {
  const result = await Bicycle.findOne({ _id });
  return result;
};

// update data into mongodb
const getUpdateBicycleData = async (_id: string, data: IBicycle) => {
  const result = await Bicycle.findByIdAndUpdate(_id, data, {
    new: true, //this new true provide me new updable data
  });
  return result;
};

// delete data from mongodb
const getDeleteBicycleData = async (_id: string) => {
  const result = await Bicycle.findByIdAndDelete({ _id });
  return result;
};

// export this object for use another file
export const bicycleService = {
  createBicycleIntoDB,
  getAllBicyclefromDB,
  getSingleBicycleFromDB,
  getUpdateBicycleData,
  getDeleteBicycleData,
};
