export const checkAvailabilityDuplicationError = (error: Error): boolean => {
  return error.message?.includes(
    `duplicate key value violates unique constraint`,
  );
};

export const checkProductAvailabilityDuplicationError = (
  error: Error,
): boolean => {
  return error.message?.includes(
    `duplicate key value violates unique constraint "availability_product_unique_constraint"`,
  );
};
