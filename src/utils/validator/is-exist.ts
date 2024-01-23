import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";

const isExistsValidator = async (
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
 * Registers a decorator that checks if an entity exists in the database.
 */
export function IsExists(
  entityName: string,
  entityPropertyName: string,
  options?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      options,
      propertyName,
      name: "isExists",
      target: object.constructor,
      constraints: [entityName, entityPropertyName],
      validator: {
        validate: isExistsValidator,
      },
    });
  };
}

const doesNotExistsValidator = async (
  value: string,
  validationArguments: ValidationArguments,
) => {
  const response = await isExistsValidator(value, validationArguments);
  return !response;
};

/**
 * Registers a decorator that checks if an entity does not exists in the database.
 */
export function DoesNotExists(
  entityName: string,
  entityPropertyName: string,
  options?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      options,
      propertyName,
      name: "doesNotExists",
      target: object.constructor,
      constraints: [entityName, entityPropertyName],
      validator: {
        validate: doesNotExistsValidator,
      },
    });
  };
}
