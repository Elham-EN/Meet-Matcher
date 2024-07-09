import { z, ZodType } from "zod";
import { MessageType } from "../types/MessageType";

export const messageSchema: ZodType<MessageType> = z.object({
  text: z.string().min(1, {
    message: "Context is required",
  }),
});
