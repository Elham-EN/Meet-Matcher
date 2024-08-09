import { differenceInYears, format, formatDistance } from "date-fns";

export function calculateAge(dob: Date): number {
  return differenceInYears(new Date(), dob);
}

// Return the formatted date string in the given format. The
// result may vary by locale.
export function formatShortDateTime(date: Date): string {
  return format(date, "dd MMM yyyy h:mm:a");
}

// Return the distance between the given dates in words.
export function timeAgo(date: string) {
  return formatDistance(new Date(date), new Date()) + " ago";
}
