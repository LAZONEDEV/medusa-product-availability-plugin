import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";

/**
 * Registers a decorator that checks if an entity exists in the database.
 */
export function IsExist(
  entityName: string,
  entityPropertyName: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isExist",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [entityName, entityPropertyName],
      options: validationOptions,
      validator: {
        async validate(
          value: string,
          validationArguments: ValidationArguments,
        ) {
          const repository = validationArguments.constraints[0];
          const pathToProperty = validationArguments.constraints[1];

          try {
            const entity: unknown = await dataSource
              .getRepository(repository)
              .findOne({
                where: {
                  [pathToProperty
                    ? pathToProperty
                    : validationArguments.property]: pathToProperty
                    ? value?.[pathToProperty] || value
                    : value,
                },
              });
            return Boolean(entity);
          } catch (error) {
            console.error(error);
            return false;
          }
        },
      },
    });
  };
}
