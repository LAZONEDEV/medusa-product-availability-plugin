import { ErrorMessage, ErrorMessageProps } from "formik";

const FieldErrorMessage = ({ className = "", ...props }: ErrorMessageProps) => {
  return (
    <ErrorMessage
      component={"span"}
      className={`text-red-500 text-small flex mt-1 ${className}`}
      {...props}
    />
  );
};

export default FieldErrorMessage;
