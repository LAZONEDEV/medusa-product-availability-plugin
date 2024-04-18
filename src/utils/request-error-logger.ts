import { nonCriticalErrors } from "@/error/nonCriticalErrors";
import { Logger } from "@medusajs/medusa";

const checkIsCritiqueError = (error: unknown) => {
  return !nonCriticalErrors.some((criticalError) => {
    return error instanceof criticalError;
  });
};

export const requestErrorLogger = (error: unknown, logger: Logger) => {
  const isCriticalError = checkIsCritiqueError(error);
  if (isCriticalError) {
    logger.error(error);
  }
};
