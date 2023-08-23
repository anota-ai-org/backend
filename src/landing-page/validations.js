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

function validateRequest(req, res, next) {
  try {
    schema.parse(req.body);
  } catch (error) {
    const message = JSON.parse(error.message)[0].message;
    return res.status(400).send({ status: 400, validation_error: message });
  }

  next();
}

module.exports = { validateRequest };
