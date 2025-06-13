import { parse, isValid } from 'date-fns';

export const isValidMonthYear = (value) => {
  if (!value) return false;
  const parsedDate = parse(value, 'MMMM yyyy', new Date());
  return isValid(parsedDate);
};

export const getComparableValue = (value) => {
  const parsedDate = parse(value, 'MMMM yyyy', new Date());
  if (!isValid(parsedDate)) return NaN;
  return parsedDate.getFullYear() + parsedDate.getMonth() / 12;
};

export const isAfter = (startStr, endStr) => {
  const startValue = getComparableValue(startStr);
  const endValue = getComparableValue(endStr);
  return endValue > startValue;
};
