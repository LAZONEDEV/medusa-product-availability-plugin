import { useField } from "formik";
import { DatePicker } from "@medusajs/ui";
import FieldLabel from "./Label";
import FieldErrorMessage from "./ErrorMessage";

interface DateFieldProps {
  name: string;
  className?: string;
  label: string;
}

const DateField = ({ name, className = "", label }: DateFieldProps) => {
  const [{ value }, , { setValue }] = useField(name);

  return (
    <>
      <FieldLabel label={label} />

      <DatePicker
        value={value}
        onChange={setValue}
        className={`mt-1 ${className}`}
      />
      <FieldErrorMessage name={name} />
    </>
  );
};

export default DateField;
