import { ISubscribe } from './subscribe.interface';
import { Subscribe } from './subscribe.model';

const subscribeIntoDB = async (payload: ISubscribe) => {
  const result = await Subscribe.create(payload);
  return result;
};
const getAllSubscribeFromDB = async () => {
  const result = await Subscribe.find();
  return result;
};

export const SubscribeService = {
  subscribeIntoDB,
  getAllSubscribeFromDB,
};
