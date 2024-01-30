import { Button } from "@medusajs/ui";
import ProductAvailabilityItem from "../utils/ProductAvailabilityItem";
import { useField } from "formik";
import FieldErrorMessage from "../../inputs/ErrorMessage";

interface AvailabilityDetailProductItemProps {
  isSubmitting: boolean;
  title: string;
  image: string;
  onRemove: () => void;
  isRemoving: boolean;
}

const AvailabilityDetailProductItem = ({
  isSubmitting,
  image,
  title,
  onRemove,
  isRemoving,
}: AvailabilityDetailProductItemProps) => {
  const [{ value }, { initialValue }, { setValue }] = useField("quantity");

  const valuedNotChanged = value === initialValue;
  return (
    <>
      <ProductAvailabilityItem
        title={title}
        image={image}
        quantity={value}
        onQuantityChange={setValue}
        onRemove={onRemove}
        isRemoving={isRemoving}
      >
        <Button
          disabled={valuedNotChanged}
          isLoading={isSubmitting}
          type="submit"
        >
          Mettre à jour
        </Button>
      </ProductAvailabilityItem>

      <FieldErrorMessage name="quantity" />
    </>
  );
};

export default AvailabilityDetailProductItem;
