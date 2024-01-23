export type FieldError = {
  field: string;
  message?: string;
  children?: FieldError[];
};
