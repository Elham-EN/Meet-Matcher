import { differenceInYears } from "date-fns";

export function calculateAge(dob: Date): number {
  return differenceInYears(new Date(), dob);
}
