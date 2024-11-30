export function formatDateTime(dateTime) {
  const date = new Date(dateTime);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleDateString('en-EN', options);
  //   return date.toLocaleDateString('no-NO', options);
}
