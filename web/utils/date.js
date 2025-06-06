export const formatToMonthYear = (val) => {
  if (!val) return '';
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

export const monthYearToYYYYMM = (val) => {
  if (!val) return '';
  if (val.toLowerCase() === 'current') return 'current'; // keep as is
  const [monthName, year] = val.split(' ');
  const months = {
    January: '01',
    February: '02',
    March: '03',
    April: '04',
    May: '05',
    June: '06',
    July: '07',
    August: '08',
    September: '09',
    October: '10',
    November: '11',
    December: '12',
  };
  const month = months[monthName];
  if (!month || !year) return '';
  return `${year}-${month}`;
};
