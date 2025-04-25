import { z } from 'zod';

export const orderValidationSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Give me valid email'),

  product: z
    .string({ required_error: 'Product ID is required' })
    .regex(/^[a-fA-F0-9]{24}$/, 'Invalid product ObjectId'),

  quantity: z
    .number({ required_error: 'Quantity is required' })
    .min(1, 'Quantity must be at least 1'),

  totalPrice: z
    .number({ required_error: 'Total price is required' }),

  status: z
    .enum(['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'])
    .optional(),

  transaction: z
    .object({
      id: z.string().optional(),
      transactionStatus: z.string().optional(),
      bank_status: z.string().optional(),
      sp_code: z.string().optional(),
      sp_message: z.string().optional(),
      method: z.string().optional(),
      date_time: z.string().optional(),
    })
    .optional(),
});
