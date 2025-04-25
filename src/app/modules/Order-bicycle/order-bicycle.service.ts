import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/appError';
import { Bicycle } from '../bicycle/bicycle.model';
import { IOrderData } from './order-bicycle.interface';
import Order from './order-bicycle.model';
// import { IUser } from '../user/user.interface';
import { JwtPayload } from 'jsonwebtoken';
import { OrderUtils } from './order.utils';


// Bicycle order create
const createBicycleOrderIntoDb = async (
  user: JwtPayload,
  payload: IOrderData,
  client_ip: string,
) => {
  let totalPrice = 0;
  const product = await Bicycle.findById(payload.product);
  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product is not found');
  }
  if (product.quantity < payload.quantity) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Insufficient stock');
  }
  product.quantity -= payload.quantity;
  product.inStock = product.quantity > 0;
  totalPrice += product.price * payload.quantity;
  let order = await Order.create({
    email: user.email,
    product,
    quantity: payload.quantity,
    totalPrice,
    status: payload.status,
  });

  // payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: user.name,
    customer_address: user.address,
    customer_email: user.email,
    customer_phone: user.phone,
    customer_city: user.city,
    client_ip,
  };

  const payment = await OrderUtils.makePayment(shurjopayPayload);

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return { order, payment };
};

const getOrdersFromToDB = async () => {
  const result = await Order.find();
  return result;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await OrderUtils.verifyPaymentAsync(order_id);
  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status === 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status === 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status === 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }
  return verifiedPayment;
};

// will total revenue into mongodb databse
const calculateTotalRevenue = async (): Promise<number> => {
  const result = await Order.aggregate([
    {
      $project: {
        totalOrderPrice: { $multiply: ['$quantity', '$totalPrice'] },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalOrderPrice' },
      },
    },
  ]);
  // If result exists, return the total revenue, else return 0
  return result.length > 0 ? result[0].totalRevenue : 0;
};
export const orderBicycleService = {
  createBicycleOrderIntoDb,
  calculateTotalRevenue,
  getOrdersFromToDB,
  verifyPayment,
};