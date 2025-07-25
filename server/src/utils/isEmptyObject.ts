export const isEmptyObject = (obj: Record<string, unknown>): boolean => {
  return Object.keys(obj || {}).length === 0;
};
