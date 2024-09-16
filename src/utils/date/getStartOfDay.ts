import { AVAILABILITY_VALIDATION_TIMEZONE } from "@/constants/envs";
import dayjs from "./dayjs";

export const getStoreTimeZoneCurrentDateStartOfDay = () => {
  if (!AVAILABILITY_VALIDATION_TIMEZONE) {
    console.warn(`The availability validation timezone is not defined. 
      Make sure it's defined via the AVAILABILITY_VALIDATION_TIMEZONE env variable.`);

    return dayjs().startOf("day").toDate();
  }

  const timeZoneCurrentDate = dayjs().tz(AVAILABILITY_VALIDATION_TIMEZONE);

  const year = timeZoneCurrentDate.year();
  const month = timeZoneCurrentDate.month();
  const date = timeZoneCurrentDate.date();

  const startOfDayUTC = new Date(Date.UTC(year, month, date));

  return startOfDayUTC;
};
