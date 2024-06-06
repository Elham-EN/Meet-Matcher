import { z, ZodType } from "zod";
import { LoginFormType } from "../types/FormType";

export const loginSchema: ZodType<LoginFormType> = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 character(s)" }),
});

// export type LoginSchema = z.infer<typeof loginSchema>;
