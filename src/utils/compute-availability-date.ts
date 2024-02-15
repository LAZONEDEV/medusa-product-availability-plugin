import { getEndOfDay } from "./date/getEndOfDay";

// this function compute the date that will be set on the
// creating availability. This date also represent the limit
// time for user to pass order on this availability.
const computeAvailabilityDateLimitTime = (date: Date | string) => {
  return getEndOfDay(date);
};

export default computeAvailabilityDateLimitTime;
