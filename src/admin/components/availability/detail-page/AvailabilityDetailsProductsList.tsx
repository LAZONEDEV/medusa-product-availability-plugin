import type { AvailabilityProduct } from "@/admin/types/api";
import { Container, Heading } from "@medusajs/ui";
import EmptyProductAvailabilities from "./EmptyProductAvailabilities";
import ProductAvailabilities from "./ProductAvailabilities";

interface AvailabilityDetailsProductsListProps {
  productAvailabilities: AvailabilityProduct[];
  availabilityId: string;
}

const AvailabilityDetailsProductsList = ({
  availabilityId,
  productAvailabilities,
}: AvailabilityDetailsProductsListProps) => {
  const isEmpty = productAvailabilities.length === 0;

  return (
    <Container>
      <Heading level="h2" className="mb-6">
        Les diponibilités des produits
      </Heading>

      {isEmpty ? (
        <EmptyProductAvailabilities />
      ) : (
        <ProductAvailabilities
          availabilityId={availabilityId}
          productAvailabilities={productAvailabilities}
        />
      )}
    </Container>
  );
};

export default AvailabilityDetailsProductsList;
