import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

const checkUniquenessOnList = async (
  value: Array<object>,
  validationArguments: ValidationArguments,
) => {
  const [uniquePropertyName] = validationArguments.constraints;

  if (!Array.isArray(value)) {
    return true;
  }

  const propertyValueMap: Record<string | number, boolean> = {};

  for (const child of value as object[]) {
    const currentValue = child[uniquePropertyName];
    if (currentValue === undefined) {
      continue;
    }

    if (propertyValueMap[currentValue]) {
      return false;
    }
    propertyValueMap[currentValue] = true;
  }

  return true;
};

/**
 * Validator to check the uniqueness of a property within a list.
 *
 */
export function IsUniquenessOnList(
  uniquePropertyName: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isUniquenessOnList",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [uniquePropertyName],
      options: validationOptions,
      validator: {
        validate: checkUniquenessOnList,
      },
    });
  };
}
