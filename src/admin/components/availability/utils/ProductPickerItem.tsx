import { Checkbox, Label } from "@medusajs/ui";

interface ProductPickerItemProps {
  title: string;
  image: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ProductPickerItem = ({
  image,
  title,
  checked,
  onChange,
}: ProductPickerItemProps) => {
  return (
    <div>
      <Label>
        <div
          className={`flex items-center space-x-2 min-w-[20rem] border rounded-lg p-2`}
        >
          <Checkbox onCheckedChange={onChange} checked={checked} />

          <img
            src={image}
            alt={title}
            className="w-16 h-16 object-cover rounded-lg"
          />

          <span className="ml-2">{title}</span>
        </div>
      </Label>
    </div>
  );
};

export default ProductPickerItem;
