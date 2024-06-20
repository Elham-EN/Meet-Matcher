import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { ZodIssue } from "zod";

interface ErrorType {
  error: string | ZodIssue[];
}

export function handleFormServerErrors<TFieldValues extends FieldValues>(
  errorResponse: ErrorType,
  setError: UseFormSetError<TFieldValues>
) {
  // Hanlde Zod issue (ZodIssue[])
  if (Array.isArray(errorResponse.error)) {
    errorResponse.error.forEach((error) => {
      const fieldName = error.path.join(".") as Path<TFieldValues>;
      // Set error inside react-hook-form
      setError(fieldName, { message: error.message });
    });
  } else {
    // You can set a server error with root as the key
    setError("root.serverError", { message: errorResponse.error });
  }
}
