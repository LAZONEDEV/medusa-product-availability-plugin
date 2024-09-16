import { AvailabilityProduct } from "@/admin/types/api";

interface AvailabilityProductsListProps {
  productAvailabilities: AvailabilityProduct[];
}

const AvailabilityProductsList = ({
  productAvailabilities,
}: AvailabilityProductsListProps) => {
  return (
    <div className="flex">
      {productAvailabilities.map((productAvailability) => {
        return (
          <div className="w-4" key={productAvailability.id}>
            <img
              className="min-w-[2rem] h-8 rounded-full border border-gray-300 hover:border-black hover:z-10"
              title={productAvailability.product.title}
              alt={productAvailability.product.title}
              src={productAvailability.product.thumbnail || ""}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AvailabilityProductsList;
