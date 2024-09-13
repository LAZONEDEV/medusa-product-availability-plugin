import { FindOperator } from "typeorm";
import { getStoreTimeZoneCurrentDateStartOfDay } from "../date/getStartOfDay";

/**
 * This operator excludes availabilities whose date is
 * less than the current date according to the time zone
 * defined for the validation of availabilities.
 */
export const ExcludeExpiredAvailabilitiesOperator = () => {
  const q = new FindOperator(
    "moreThanOrEqual",
    getStoreTimeZoneCurrentDateStartOfDay(),
  );
  q.transformValue({
    to: (value: Date) => {
      return value.toISOString().split("T")[0];
    },
    from: (value) => value,
  });

  return q;
};
