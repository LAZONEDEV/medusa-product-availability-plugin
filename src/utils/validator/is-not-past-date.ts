import { registerDecorator, ValidationOptions } from "class-validator";

export function IsNotPastDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isNotPastDate",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string | Date) {
          const relatedDate = new Date(value);
          const now = new Date();
          return relatedDate > now;
        },
      },
    });
  };
}
