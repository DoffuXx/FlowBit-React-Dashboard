import { format, formatISO, setHours } from "date-fns";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const formatDate = (date: Date | string): string => {
  return format(date, "dd/MM/yyyy");
};
export const formatDateforApi = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};
export const formatDateIso = (date: Date): string => {
  const dateWithTime = setHours(date, 15);
  return formatISO(dateWithTime);
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
