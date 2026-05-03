import { email, object, string } from "zod"

export const signUpSchema = object({
  username: string()
    .min(1, "Username is required")
    .min(3, "Username must be more than 3 characters")
    .max(32, "Username must be less than 32 characters"),
  email: email(),
  password: string()
    .min(1, "Password is required")
    .min(7, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  confirm: string()
    .min(1, "Password is required")
    .min(7, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})
 
export const signInSchema = object({
  email: email(),
  password: string()
    .min(1, "Password is required")
    .min(7, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})