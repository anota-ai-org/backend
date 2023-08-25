const { z } = require('zod');

const schema = z
  .object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      })
      .min(3, { message: 'Name must be 3 or more characters long' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    message: z.string({
      invalid_type_error: 'Message must be a string',
    }),
  })
  .partial({ message: true });

export function validateLandingRegister(body: unknown) {
  try {
    schema.parse(body);
  } catch (error) {
    const err = error as Error;
    const message = JSON.parse(err.message)[0].message;
    throw { status: "BAD_REQUEST", validation_error: message };
  }
}
