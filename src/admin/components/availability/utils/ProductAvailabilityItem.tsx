import { Trash } from "@medusajs/icons";
import {
  Heading,
  Input,
  Text,
  IconButton,
  Checkbox,
  Label,
} from "@medusajs/ui";
import { ReactNode, useId } from "react";

interface ProductAvailabilityItemProps {
  image: string;
  title: string;
  quantity: number | null;
  onQuantityChange: (quantity: number | null) => void;
  onRemove: () => void;
  children?: ReactNode;
  isRemoving?: boolean;
}

const ProductAvailabilityItem = ({
  image,
  onQuantityChange,
  quantity,
  title,
  onRemove,
  children,
  isRemoving,
}: ProductAvailabilityItemProps) => {
  const unlimitedFieldID = useId();
  const allowUnlimited = quantity === null;

  const onAllowUnlimited = (allowed: boolean) => {
    if (allowed) {
      onQuantityChange(null);
    } else {
      onQuantityChange(0);
    }
  };

  return (
    <div className="flex my-2 border rounded-lg">
      <img
        alt={title}
        src={image}
        className="w-[70px] min-h-full rounded-tl-lg rounded-bl-lg object-cover"
      />

      <div className="flex flex-col justify-between flex-1 m-3">
        <div className="flex items-center justify-between w-full mb-2">
          <Heading level="h3">{title}</Heading>

          <IconButton
            type="button"
            title="Retirer le produit"
            isLoading={isRemoving}
            onClick={onRemove}
          >
            <Trash />
          </IconButton>
        </div>

        <div className="flex items-center justify-between">
          <Text className="text-gray-500" as="span">
            Quantité :
          </Text>

          <div className="flex">
            <div className="flex items-center mr-2 space-x-2">
              <Label htmlFor={unlimitedFieldID} className="text-small">
                Quantité illimitée
              </Label>

              <Checkbox
                id={unlimitedFieldID}
                checked={allowUnlimited}
                onCheckedChange={onAllowUnlimited}
              />
            </div>

            <Input
              disabled={allowUnlimited}
              size="small"
              min="0"
              value={quantity || 0}
              type="number"
              onChange={(e) => onQuantityChange(Number(e.target.value))}
            />
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default ProductAvailabilityItem;
