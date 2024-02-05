const convertDate = (date) => {
  const now = new Date();
  const originalDate = new Date(date);
  const formattedDate = originalDate.toISOString().slice(0, 19).replace("T", " ");
  const timeDifference = now - originalDate; // Difference in milliseconds
  var isGreaterThan = false;
  const twoHoursInMilliseconds = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

  if (timeDifference > twoHoursInMilliseconds) {
    isGreaterThan = true;
  }

  return { formattedDate: formattedDate, isGreaterThan: isGreaterThan };
};

export default convertDate;
