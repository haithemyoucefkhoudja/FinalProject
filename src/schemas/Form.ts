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
    FirstName: z.string()
    .min(1, "FirstName is Required")
    .max(30, "FirstName is Too Long")
    .regex(new RegExp("^[a-zA-Z]+$"), {message:"FirstName must contain Letters Only"})
    .regex(new RegExp("[A-Z].*"), {message:"FirstName must start with capital letter"}),
    LastName: z.string()
    .min(1, "LastName is Required")
    .max(30, "LastName is Too Long")
    .regex(new RegExp("^[a-zA-Z]+$"), {message:"LastName must contain Letters Only"})
    .regex(new RegExp("^[A-Z].*"), {message:"LastName must start with capital letter"}),
    passwordConfirmation:z.string()
    .min(1, "Password confirmation is required!"),
    CompanyName: z.string()
    .min(1, "CompanyName is Required")
    .max(30, "CompanyName is Too Long")
    .regex(new RegExp("[A-Z].*"), {message:"CompanyName must start with capital letter"}),

}).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords don't match",
        path: ["passwordConfirmation"],
    });