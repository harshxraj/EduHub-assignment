// import dayjs from "dayjs";

// export const getDateFromObjectId = (date) => {
//   const dayjsDate = dayjs(date);

//   // Format the date
//   const formattedDate = dayjsDate.format("YYYY-MM-DD HH:mm:ss");

//   return formattedDate;
// };

import moment from "moment";

export const getDateFromObjectId = (milliseconds) => {
  console.log(milliseconds);
  const date = new Date(milliseconds);
  console.log(date);

  // Parse the Date object using Moment.js
  const parsedDate = moment(date);

  // Format the date according to your requirements
  const formattedDate = parsedDate.format("YYYY-MM-DD HH:mm:ss");

  return formattedDate;
};

import dayjs from "dayjs";

// Sample time strings
const timeStrings = ["9:01am", "10:00pm", "8:30am", "11:45pm"];

// Parse and convert time strings to 24-hour format
const sortedTimeStrings = timeStrings.sort((a, b) => {
  const timeA = dayjs(a, "h:mma").format("HH:mm"); // Parse and convert to 24-hour format
  const timeB = dayjs(b, "h:mma").format("HH:mm"); // Parse and convert to 24-hour format
  return timeA.localeCompare(timeB); // Compare and sort
});

console.log(sortedTimeStrings);
