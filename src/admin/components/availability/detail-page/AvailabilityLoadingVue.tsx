import { Container } from "@medusajs/ui";
import ProductAvailabilityLoadingSkeleton from "../create-form/LoadingSkeleton";

const AvailabilityLoadingVue = () => {
  return (
    <div className="space-y-5" role="status">
      <div className="bg-gray-200 w-80 h-4 min-h-full rounded-full" />
      <div className="bg-gray-200 w-60 h-3 min-h-full rounded-full" />

      <Container className="max-w-2xl">
        <div className="bg-gray-200 w-40 h-4 min-h-full rounded-full" />

        <ProductAvailabilityLoadingSkeleton />
      </Container>

      <Container className="max-w-2xl">
        <div className="bg-gray-200 w-40 h-4 min-h-full rounded-full" />

        <ProductAvailabilityLoadingSkeleton />
      </Container>
    </div>
  );
};

export default AvailabilityLoadingVue;
