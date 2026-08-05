export function formatDate(
  date: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
) {
  return new Intl.DateTimeFormat("en", options).format(
    new Date(`${date}T12:00:00`),
  );
}

export function formatLongDate(date: string) {
  return formatDate(date, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
