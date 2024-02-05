import { format } from "date-fns";

export const mysqlDateTimeFormat = (dateTime) => {
  if (!dateTime) return null;
  return format(new Date(dateTime), "yyyy-MM-dd hh:mm:ss");
};

export const mysqlDateFormat = (date) => {
  if (!date) return null;
  return format(new Date(date), "yyyy-MM-dd");
};

export const dateFormat = (date) => {
  if (!date) return null;
  return format(new Date(date), "dd/MM/yyyy");
};

export const dateTimeFormat = (dateTime) => {
  if (!dateTime) return null;
  return format(new Date(dateTime), "dd/MM/yyy hh:mm:ss");
};

export const diffDays = (date1, date2) => {
  const dateOne = new Date(date1);
  const dateTwo = new Date(date2);
  const diffTime = Math.abs(dateTwo - dateOne);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
