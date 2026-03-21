import { email, object, string } from "zod"
 
export const signInSchema = object({
  email: email(),
  password: string()
    .min(1, "Password is required")
    .min(7, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})