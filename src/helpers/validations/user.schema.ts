import { z } from "zod";

export const RegisterUserSchema = z
  .object({
    fullName: z
      .string({
        required_error: "Name is required",
      })
      .min(1, "Full name is required"),
    username: z
      .string({
        required_error: "Username is required",
      })
      .min(3, "Username must contain at least three characters"),
    phone: z
      .string({
        required_error: "Phone is required",
      })
      .min(10, "Phone must contain at least 10 characters")
      .max(11, "Phone must contain at most 11 characters"),
  email: z
      .string({
        required_error: "Email is required",
      })
      .min(1, "Email is required")
      .email("Email is invalid"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters")
      .regex(/[^a-zA-Z0-9\s]/, "Password must contain at least one special character"),
  });

export const LoginUserSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(1, "Email is required")
    .email("Email is invalid"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export type LoginUserInput = z.infer<typeof LoginUserSchema>;
export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
