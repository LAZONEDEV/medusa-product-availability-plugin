import { AVAILABILITY_VALIDATION_TIMEZONE } from "@/constants/envs";
import { registerDecorator, ValidationOptions } from "class-validator";
import dayjs from "../date/dayjs";

export function IsNotPastDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isNotPastDate",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string | Date) {
          const current = dayjs().tz(AVAILABILITY_VALIDATION_TIMEZONE);
          const relatedDate = dayjs.tz(value, AVAILABILITY_VALIDATION_TIMEZONE);

          return !relatedDate.isBefore(current, "date");
        },
      },
    });
  };
}
