const validMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const monthPattern = validMonths.join('|');
const yearPattern = '\\d{4}';
const fullPattern = `^(${monthPattern}) ${yearPattern}$`;

const monthYearRegex = new RegExp(fullPattern);

export default monthYearRegex;
