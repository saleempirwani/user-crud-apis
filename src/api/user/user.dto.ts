import { object, z } from "zod";
import { REGEX } from "../../app-constants/regex";
import { zodErrorHandle } from "../../utils/error";
import { Role } from "./user.interface";

// User Create Dto
export const createUserDto = object({
  user_id: z
    .number({
      required_error: zodErrorHandle("User ID", "is required"),
      invalid_type_error: zodErrorHandle("User ID", "must be a number"),
    })
    .int(zodErrorHandle("User ID", "must be an integer"))
    .refine((value) => value >= 1 && value <= 99999999999, {
      message: zodErrorHandle("User ID", "must be between 1 and 11 digits"),
    }),

  firstName: z
    .string({
      required_error: zodErrorHandle("First Name", "is required"),
      invalid_type_error: zodErrorHandle("First Name", "must be a string"),
    })
    .min(2, zodErrorHandle("First Name", "min. limit is 2"))
    .max(20, zodErrorHandle("First Name", "max. limit is 20"))
    .refine((value) => REGEX.alphabets.test(value), {
      message: zodErrorHandle("First Name", "must contain only letters"),
    }),

  lastName: z
    .string({
      required_error: zodErrorHandle("Last Name", "is required"),
      invalid_type_error: zodErrorHandle("Last Name", "must be a string"),
    })
    .min(2, zodErrorHandle("Last Name", "min. limit is 2"))
    .max(20, zodErrorHandle("Last Name", "max. limit is 20"))
    .refine((value) => REGEX.alphabets.test(value), {
      message: zodErrorHandle("Last Name", "must contain only letters"),
    }),

  username: z
    .string({
      required_error: zodErrorHandle("Username", "is required"),
      invalid_type_error: zodErrorHandle("Username", "must be a string"),
    })
    .min(2, zodErrorHandle("Username", "min. limit is 2"))
    .max(20, zodErrorHandle("Username", "max. limit is 20"))
    .refine((value) => REGEX.alphanumeric.test(value), {
      message: zodErrorHandle(
        "Username",
        "only contains alphanumeric characters"
      ),
    }),

  email: z
    .string({
      required_error: zodErrorHandle("Email", "is required"),
      invalid_type_error: zodErrorHandle("Email", "must be a string"),
    })
    .email(zodErrorHandle("Email", "format is invalid")),

  state: z
    .string({
      required_error: zodErrorHandle("State", "is required"),
      invalid_type_error: zodErrorHandle("State", "must be a string"),
    })
    .refine((value) => REGEX.alphabetsSpace.test(value), {
      message: zodErrorHandle("State", "must contain only letters and spaces"),
    }),

  role: z.nativeEnum(Role, {
    required_error: zodErrorHandle("Role", "is required"),
    invalid_type_error: zodErrorHandle("Role", "is invalid"),
  }),
}).strict({
  message: zodErrorHandle("", "Please provide only allowed fields."),
});

// User Update Dto
export const updateUserDto = object({
  firstName: z
    .string({
      required_error: zodErrorHandle("First Name", "is required"),
      invalid_type_error: zodErrorHandle("First Name", "must be a string"),
    })
    .min(2, zodErrorHandle("First Name", "min. limit is 2"))
    .max(20, zodErrorHandle("First Name", "max. limit is 20"))
    .refine((value) => REGEX.alphabets.test(value), {
      message: zodErrorHandle("First Name", "must contain only letters"),
    })
    .optional(),

  lastName: z
    .string({
      required_error: zodErrorHandle("Last Name", "is required"),
      invalid_type_error: zodErrorHandle("Last Name", "must be a string"),
    })
    .min(2, zodErrorHandle("Last Name", "min. limit is 2"))
    .max(20, zodErrorHandle("Last Name", "max. limit is 20"))
    .refine((value) => REGEX.alphabets.test(value), {
      message: zodErrorHandle("Last Name", "must contain only letters"),
    })
    .optional(),

  username: z
    .string({
      required_error: zodErrorHandle("Username", "is required"),
      invalid_type_error: zodErrorHandle("Username", "must be a string"),
    })
    .min(2, zodErrorHandle("Username", "min. limit is 2"))
    .max(20, zodErrorHandle("Username", "max. limit is 20"))
    .refine((value) => REGEX.alphanumeric.test(value), {
      message: zodErrorHandle(
        "Username",
        "only contains alphanumeric characters"
      ),
    })
    .optional(),

  email: z
    .string({
      required_error: zodErrorHandle("Email", "is required"),
      invalid_type_error: zodErrorHandle("Email", "must be a string"),
    })
    .email(zodErrorHandle("Email", "format is invalid"))
    .optional(),

  state: z
    .string({
      required_error: zodErrorHandle("State", "is required"),
      invalid_type_error: zodErrorHandle("State", "must be a string"),
    })
    .refine((value) => REGEX.alphabetsSpace.test(value), {
      message: zodErrorHandle("State", "must contain only letters and spaces"),
    })
    .optional(),

  role: z
    .nativeEnum(Role, {
      required_error: zodErrorHandle("Role", "is required"),
      invalid_type_error: zodErrorHandle("Role", "is invalid"),
    })
    .optional(),
}).strict({
  message: zodErrorHandle("", "Please provide only allowed fields."),
});

export type CreateUserDtoType = z.infer<typeof createUserDto>;
export type UpdateUserDtoType = z.infer<typeof updateUserDto>;
