import { FieldError } from "@/types/error";

type FormikError = {
  [key: string]: FormikError[] | string | (FormikError | string)[];
};

export const fieldErrorsToFormikErrors = (errors: FieldError[]) => {
  const formikErrors: FormikError = {};

  errors.forEach((currentError) => {
    if (currentError.children) {
      formikErrors[currentError.field] = [];

      currentError.children.forEach((item) => {
        if (item.children) {
          formikErrors[currentError.field][item.field] =
            fieldErrorsToFormikErrors(item.children!);
          return;
        }

        formikErrors[currentError.field][item.field] = item.message!;
      });
      return;
    }

    formikErrors[currentError.field] = currentError.message!;
  });

  return formikErrors;
};
