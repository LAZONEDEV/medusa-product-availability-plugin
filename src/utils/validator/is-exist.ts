import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";

const doesExistValidator = async (
  value: string,
  validationArguments: ValidationArguments,
) => {
  const [repository, pathToProperty] = validationArguments.constraints;

  try {
    const entity: unknown = await dataSource.getRepository(repository).findOne({
      where: {
        [pathToProperty]: value,
      },
    });
    return Boolean(entity);
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * Registers a decorator that checks if a record exists in the database.
 */
export function DoesExist(
  entityName: string,
  entityPropertyName: string,
  options?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      options,
      propertyName,
      name: "doesExist",
      target: object.constructor,
      constraints: [entityName, entityPropertyName],
      validator: {
        validate: doesExistValidator,
      },
    });
  };
}

const doesNotExistValidator = async (
  value: string,
  validationArguments: ValidationArguments,
) => {
  const response = await doesExistValidator(value, validationArguments);
  return !response;
};

/**
 * Registers a decorator that checks if a record does not exist in the database.
 */
export function DoesNotExist(
  entityName: string,
  entityPropertyName: string,
  options?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      options,
      propertyName,
      name: "doesNotExist",
      target: object.constructor,
      constraints: [entityName, entityPropertyName],
      validator: {
        validate: doesNotExistValidator,
      },
    });
  };
}
