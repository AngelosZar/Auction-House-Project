export function formatDateTime(dateTime) {
  const date = new Date(dateTime);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-EN', options);
  //   return date.toLocaleDateString('no-NO', options);
}
