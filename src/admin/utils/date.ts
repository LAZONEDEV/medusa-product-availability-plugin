export const toLocaleDate = (date: string | Date) => {
  return new Date(date).toLocaleString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
