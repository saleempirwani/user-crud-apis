import { object, z } from "zod";
import { REGEX } from "../../app-constants/regex";
import { zodErrorHandle } from "../../utils/error";

// User Update Dto
export const updateUserDto = object({
  firstName: z
    .string({
      required_error: zodErrorHandle("First Name", "is required"),
      invalid_type_error: zodErrorHandle("First Name", "must be a string"),
    })
    .min(2, zodErrorHandle("First Name", "must contain at least 2 letters"))
    .max(20, zodErrorHandle("First Name", "must contain upto 20 letters"))
    .refine((value) => REGEX.alphabets.test(value), {
      message: zodErrorHandle("First Name", "must contain only letters"),
    })
    .optional(),

  lastName: z
    .string({
      required_error: zodErrorHandle("Last Name", "is required"),
      invalid_type_error: zodErrorHandle("Last Name", "must be a string"),
    })
    .min(2, zodErrorHandle("Last Name", "must contain at least 2 letters"))
    .max(20, zodErrorHandle("First Name", "must contain upto 20 letters"))
    .refine((value) => REGEX.alphabets.test(value), {
      message: zodErrorHandle("Last Name", "must contain only letters"),
    })
    .optional(),

  phoneNumber: z
    .string({
      required_error: zodErrorHandle("Phone Number", "is required"),
      invalid_type_error: zodErrorHandle("Phone Number", "must be a string"),
    })
    .refine((value) => REGEX.phoneNumber.test(value), {
      message: zodErrorHandle("Phone Number", "format is invalid"),
    })
    .optional(),

  bio: z
    .union([
      z
        .string({
          required_error: zodErrorHandle("Bio", "is required"),
          invalid_type_error: zodErrorHandle("Bio", "must be a string"),
        })
        .min(20, zodErrorHandle("Bio", "cannot be empty"))
        .max(800, zodErrorHandle("Bio", "must contain upto 800 characters")),
      z.string().length(0),
    ])
    .optional(),
}).strict({
  message: zodErrorHandle("", "Please provide only allowed fields."),
});

export type UpdateUserDtoType = z.infer<typeof updateUserDto>;
