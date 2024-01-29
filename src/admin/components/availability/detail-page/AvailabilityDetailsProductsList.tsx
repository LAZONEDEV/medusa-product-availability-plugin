import type { AvailabilityProduct } from "@/admin/types/api";
import { Container, Heading, Text } from "@medusajs/ui";
import EditableAvailabilityDetailProduct from "./EditableAvailabilityDetailProduct";

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
    <Container className="max-w-2xl">
      <Heading level="h2" className="mb-6">
        Les diponibilités des produits
      </Heading>

      {productAvailabilities.map((productAvailability) => (
        <EditableAvailabilityDetailProduct
          availabilityId={availabilityId}
          key={productAvailability.id}
          productAvailability={productAvailability}
        />
      ))}

      {isEmpty ? (
        <Text className="text-center">
          Aucune disponibilité de produit définie
        </Text>
      ) : null}
    </Container>
  );
};

export default AvailabilityDetailsProductsList;
