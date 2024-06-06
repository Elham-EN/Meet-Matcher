import { z, ZodType } from "zod";
import { RegisterFormType } from "../types/FormType";

export const registerSchema: ZodType<RegisterFormType> = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 character(s)" }),
});
