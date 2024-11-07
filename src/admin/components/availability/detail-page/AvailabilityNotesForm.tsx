import { Button } from "@medusajs/ui";
import TextareaField from "../../inputs/TextareaField";

interface AvailabilityNotesFormProps {
  isLoading?: boolean;
  canSubmit: boolean;
}
const AvailabilityNotesForm = ({
  canSubmit,
  isLoading,
}: AvailabilityNotesFormProps) => {
  return (
    <>
      <TextareaField label="Information de retrait" name="withdrawNote" />
      <TextareaField label="Information de livraison" name="deliveryNote" />

      {canSubmit ? (
        <Button type="submit" isLoading={isLoading} className="mt-4">
          Sauvegarder
        </Button>
      ) : null}
    </>
  );
};

export default AvailabilityNotesForm;
