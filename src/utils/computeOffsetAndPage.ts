export const computeOffsetAndPage = (limit = 10, page = 0) => {
  const skipOffset = Math.max(page * limit, 0);

  return [limit, skipOffset] as const;
};
