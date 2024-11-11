import React, { useId } from "react";
import { useField } from "formik";
import { Textarea, Label } from "@medusajs/ui";
import FieldErrorMessage from "./ErrorMessage";

interface TextareaFieldProps {
  name: string;
  placeholder?: string;
  className?: string;
  label: string;
}

const TextareaField = ({
  name,
  className = "",
  placeholder,
  label,
}: TextareaFieldProps) => {
  const id = useId();
  const [{ value, onChange }] = useField(name);

  return (
    <div>
      <Label
        className="font-semibold text-grey-50 inter-small-semibold mb-xsmall"
        htmlFor={id}
      >
        {label}
      </Label>

      <Textarea
        id={id}
        value={value}
        onChange={onChange}
        name={name}
        className={`mt-1 ${className}`}
        placeholder={placeholder}
      />
      <FieldErrorMessage name={name} label={label} />
    </div>
  );
};

export default TextareaField;
