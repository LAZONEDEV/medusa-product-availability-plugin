import { Trash } from "@medusajs/icons";
import { Heading, Input, Text, IconButton } from "@medusajs/ui";

interface ProductAvailabilityItemProps {
  image: string;
  title: string;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

const ProductAvailabilityItem = ({
  image,
  onQuantityChange,
  quantity,
  title,
  onRemove,
}: ProductAvailabilityItemProps) => {
  return (
    <div className="flex my-2 border rounded-lg">
      <img
        alt={title}
        src={image}
        className="w-[70px] min-h-full rounded-tl-lg rounded-bl-lg object-cover"
      />

      <div className="m-3 flex flex-1 flex-col justify-between">
        <div className="flex w-full mb-2 justify-between items-center">
          <Heading level="h3">{title}</Heading>

          <IconButton onClick={() => onRemove()}>
            <Trash />
          </IconButton>
        </div>

        <div className="flex items-center justify-between">
          <Text className="text-gray-500" as="span">
            Quantité :
          </Text>

          <Input
            size="small"
            min="0"
            value={quantity}
            type="number"
            onChange={(e) => onQuantityChange(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductAvailabilityItem;
