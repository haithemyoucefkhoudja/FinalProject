import { z } from "zod";

export const LoginFormSchema = z.object({
    email: z.string()
    .min(1, "Email is required!")
    .max(50, "Email is Too Long")
    .email("Invalid email!"),
    password: z.string()
      .min(1, "Password is required!")
      .min(4, "Password must have than 4 characters!")
      .regex(new RegExp(".*[A-Z].*"), { message: "Must conatain one uppercase character" })
      .regex(new RegExp(".*\\d.*"), { message: "Must contains one number" })
      .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), {message: "Must contain one special character"}),
  });

  export const RegisterFormSchema = z.object({
    ...LoginFormSchema.shape,
    username: z.string()
    .min(1, "Name is Required")
    .max(30, "Name is Too Long"),
    passwordConfirmation:z.string()
    .min(1, "Password confirmation is required!"),
    company_name: z.string()
    .min(1, "CompanyName is Required")
    .max(30, "CompanyName is Too Long")
    .regex(new RegExp("[A-Z].*"), {message:"CompanyName must start with capital letter"}),
    warehouse_name:z.string()
    .min(1, "WarehouseName is Required")
    .max(30, "WarehouseName is Too Long")
    .regex(new RegExp("[A-Z].*"), {message:"WarehouseName must start with capital letter"})
    .optional()
    .or(z.literal('')),
    role:z.enum([
      "driver",
      "observer",
      "admin",
      'worker'
  ]).optional().or(z.literal('')),
}).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords don't match",
        path: ["passwordConfirmation"],
    });