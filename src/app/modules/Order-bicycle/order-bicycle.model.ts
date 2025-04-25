import mongoose, { model, Schema } from 'mongoose';
import { IOrderData } from './order-bicycle.interface';
//this is a order model schema
const orderResponsonseSchema = new Schema<IOrderData>(
  {
    email: {
      type: String,
      required: true,
      // will using validation for email format
      validate: {
        validator: function (value: string): boolean {
          // Regex for validating email format
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Give me valid email',
      },
      ref: 'User',
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bicycle',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  // Automatically adds createdAt and updatedAt fields
  {
    timestamps: true,
  },
);
//this is a order model
const Order = model<IOrderData>('Oder', orderResponsonseSchema);
export default Order;