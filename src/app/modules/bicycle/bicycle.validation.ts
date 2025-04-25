import { z } from 'zod';

const bicycleValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: 'Name is required' })
      .refine((val) => /^[A-Z]/.test(val), {
        message: 'ValidationError',
      }),
    brand: z.string().min(1, { message: 'Brand is required' }),
    price: z.number().min(0, { message: 'Price must be a positive number' }),
    model: z.string({ required_error: 'Model is required' }),
    category: z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
      message: 'Invalid bike category',
    }),
    description: z.string().min(1, { message: 'Description is required' }),
    quantity: z
      .number()
      .int()
      .min(0, { message: 'Price must be a positive number' }),
    inStock: z.boolean().default(true),
    image: z.string().optional(),
  }),
});

export default bicycleValidationSchema;
