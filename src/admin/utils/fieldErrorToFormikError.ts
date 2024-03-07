import { FieldError } from "@/types/error";

type FormikError = {
  [key: string]: string | (FormikError | string)[];
};

export const fieldErrorsToFormikErrors = (errors: FieldError[]) => {
  const formikErrors: FormikError = {};

  errors.forEach((currentError) => {
    if (currentError.children?.length) {
      formikErrors[currentError.field] = [];

      currentError.children.forEach((item) => {
        const itemIndex = Number(item.field);
        if (item.children) {
          (formikErrors[currentError.field] as FormikError[])[itemIndex] =
            fieldErrorsToFormikErrors(item.children!);
          return;
        }

        (formikErrors[currentError.field] as string[])[itemIndex] =
          item.message!;
      });
      return;
    }

    formikErrors[currentError.field] = currentError.message!;
  });

  return formikErrors;
};
