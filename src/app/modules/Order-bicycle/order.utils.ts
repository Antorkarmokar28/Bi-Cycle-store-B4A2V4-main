/* eslint-disable @typescript-eslint/no-explicit-any */
import Shurjopay, { PaymentResponse, VerificationResponse } from 'shurjopay';
import config from '../../config';

const shurjopay = new Shurjopay();

shurjopay.config(
  config.sp_endpoint!,
  config.sp_username!,
  config.sp_password!,
  config.sp_prefix!,
  config.sp_return_url!,
);

const makePayment = async (paymentPayload: any): Promise<PaymentResponse> => {
  return new Promise((resolved, reject) => {
    shurjopay.makePayment(
      paymentPayload,
      (response) => resolved(response),
      (error) => reject(error),
    );
  });
};

const verifyPaymentAsync = async (
  order_id: string,
): Promise<VerificationResponse[]> => {
  return new Promise((resolved, reject) => {
    shurjopay.verifyPayment(
      order_id,
      (respone) => resolved(respone),
      (error) => reject(error),
    );
  });
};

export const OrderUtils = {
  makePayment,
  verifyPaymentAsync,
};