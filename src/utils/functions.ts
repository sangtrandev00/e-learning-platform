// import { format } from 'date-fns';

// function formatDate(dateString: string) {
//   const date = new Date(dateString) ;
//   return `(${format(date, 'dd MMM yyyy')})`;
// }

// const inputDateString = '2023-05-20T09:24:22.806Z';
// const formattedDate = formatDate(inputDateString);
// console.log(formattedDate); // Output: (20 May 2023)
export function formatTime(seconds: number) {
  const date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substr(14, 5);
}

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
