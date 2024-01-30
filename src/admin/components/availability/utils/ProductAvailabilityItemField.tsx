import { CreateAvailabilityProductItem } from "../../../types/api";
import FieldErrorMessage from "../../inputs/ErrorMessage";
import ProductAvailabilityItem from "./ProductAvailabilityItem";
import { useField } from "formik";

interface ProductItemFieldProps {
  title: string;
  image: string;
  productId: string;
  fieldName: string;
  onRemove: () => void;
}

const ProductItemField = ({
  image,
  title,
  fieldName,
  productId,
  onRemove,
}: ProductItemFieldProps) => {
  const [{ value }, , { setValue }] =
    useField<CreateAvailabilityProductItem>(fieldName);

  const onQuantityChange = (quantity: number) => {
    setValue({
      quantity,
      productId,
    });
  };

  const quantity = value?.quantity;

  return (
    <>
      <ProductAvailabilityItem
        title={title}
        image={image}
        quantity={quantity}
        onQuantityChange={onQuantityChange}
        onRemove={onRemove}
      />

      <FieldErrorMessage name={`${fieldName}.quantity`} />
      <FieldErrorMessage name={`${fieldName}.productId`} />
    </>
  );
};

export default ProductItemField;
