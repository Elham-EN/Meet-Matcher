import { ZodIssue } from "zod";

// For error handling purposes
type ActionResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string | ZodIssue[] };
