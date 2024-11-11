import { ErrorMessage, ErrorMessageProps } from "formik";

const FieldErrorMessage = ({
  name,
  className = "",
  label = "",
  ...props
}: ErrorMessageProps & { label?: string }) => {
  if (label.length) {
    return (
      <ErrorMessage name={name} component="div" {...props}>
        {(msg) => (
          <span className={`text-red-500 text-small flex mt-1 ${className}`}>
            {msg.replace(name, label)}
          </span>
        )}
      </ErrorMessage>
    );
  }
  return (
    <ErrorMessage
      name={name}
      component={"span"}
      className={`text-red-500 text-small flex mt-1 ${className}`}
      {...props}
    />
  );
};

export default FieldErrorMessage;
