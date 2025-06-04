const formatToMonthYear = (val) => {
  const [year, month] = val.split('-');
  const months = [
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
  return months[parseInt(month, 10) - 1] + ' ' + year;
};
export default formatToMonthYear;
