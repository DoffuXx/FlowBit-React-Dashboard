import { format, formatISO, setHours } from "date-fns";

export const formatDate = (date: Date): string => {
  return format(date, "dd/MM/yyyy");
};
export const formatDateforApi = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};
export const formatDateIso = (date: Date): string => {
  const dateWithTime = setHours(date, 15);
  return formatISO(dateWithTime);
};
