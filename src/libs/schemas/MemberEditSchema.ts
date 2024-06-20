import { z, ZodType } from "zod";
import { MemberEditFormType } from "../types/FormType";

export const memberEditSchema: ZodType<MemberEditFormType> = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  city: z.string().min(1, { message: "City is required" }),
  country: z.string().min(1, { message: "Country is required" }),
});
