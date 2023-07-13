export function tzIsoTimestamp(date: Date) {
  const now = new Date(date);
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
}
