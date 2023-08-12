// import { format } from 'date-fns';

// function formatDate(dateString: string) {
//   const date = new Date(dateString) ;
//   return `(${format(date, 'dd MMM yyyy')})`;
// }

// const inputDateString = '2023-05-20T09:24:22.806Z';
// const formattedDate = formatDate(inputDateString);
// console.log(formattedDate); // Output: (20 May 2023)

import dayjs from 'dayjs';
import 'dayjs/locale/en'; // Import the English locale (you can replace 'en' with your desired locale)

export const transformDate = (apiDate: string) => {
  const parsedDate = dayjs(apiDate);
  const formattedDate = parsedDate.format('M/YYYY');
  return formattedDate;
};

export function formatTime(seconds: number) {
  const date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substr(14, 5);
}

export const formatVideoLengthToHours = (seconds: number): string => {
  const hours = seconds / 3600;
  return `${hours.toFixed(1)} hours`;
};

export function getHeaders() {
  const token = localStorage.getItem('token');
  if (token) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };
  } else {
    return {
      'Content-Type': 'application/json'
    };
  }
}

export function getHeadersAdmin() {
  const adminToken = localStorage.getItem('adminToken');
  if (adminToken) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`
    };
  } else {
    return {
      'Content-Type': 'application/json'
    };
  }
}
