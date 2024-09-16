export const formatAvailabilityDate = (date: string | Date) => {
  const formatConfig: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (typeof date === "string") {
    const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
    const match = date.match(regex);

    if (match) {
      const [_, year, month, day] = match.map(Number);
      return new Date(year, month - 1, day).toLocaleString(
        undefined,
        formatConfig
      );
    }
  }

  return date.toLocaleString(undefined, formatConfig);
};
