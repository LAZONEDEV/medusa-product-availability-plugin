export type FieldError = {
  field: string;
  message?: string;
  children?: FieldError[];
};

export interface ErrorCodeMessageObj {
  code: string;
  message: string;
}
