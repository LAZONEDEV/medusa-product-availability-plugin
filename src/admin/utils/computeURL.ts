export const computeURL = (baseURL: string, pathname: string) => {
  return `${baseURL}${baseURL.endsWith("/") ? "" : "/"}${pathname}`;
};
