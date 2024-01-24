import { Label } from "@medusajs/ui";

interface FieldLabelProps {
  label: string;
  htmlFor?: string;
}
const FieldLabel = ({ label, htmlFor }: FieldLabelProps) => {
  return (
    <Label
      className="font-semibold text-grey-50 inter-small-semibold mb-small"
      htmlFor={htmlFor}
    >
      {label}
    </Label>
  );
};

export default FieldLabel;
