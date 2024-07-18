import { differenceInYears, format } from "date-fns";

export function calculateAge(dob: Date): number {
  return differenceInYears(new Date(), dob);
}

export function formatShortDateTime(date: Date): string {
  return format(date, "dd MMM yyyy h:mm:a");
}
