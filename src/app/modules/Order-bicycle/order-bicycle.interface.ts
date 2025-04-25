import mongoose, { Document } from 'mongoose';
//create an order interface
export interface IOrderData extends Document {
  email: string;
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  status?: string;
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  createdAt: Date;
  updatedAt: Date;
}