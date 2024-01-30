import { AvailabilityProduct } from "@/admin/types/api";
import EditableAvailabilityDetailProduct from "./EditableAvailabilityDetailProduct";

interface ProductAvailabilitiesProps {
  productAvailabilities: AvailabilityProduct[];
  availabilityId: string;
}
const ProductAvailabilities = ({
  productAvailabilities,
  availabilityId,
}: ProductAvailabilitiesProps) => {
  return (
    <>
      {productAvailabilities.map((productAvailability) => (
        <EditableAvailabilityDetailProduct
          availabilityId={availabilityId}
          key={productAvailability.id}
          productAvailability={productAvailability}
        />
      ))}
    </>
  );
};

export default ProductAvailabilities;
