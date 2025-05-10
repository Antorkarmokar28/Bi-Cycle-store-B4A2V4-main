import { z } from 'zod';

export const subscribeValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .trim()
      .email('Invalid email format'),
  }),
});
