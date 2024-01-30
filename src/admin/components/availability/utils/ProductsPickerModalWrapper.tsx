import { BuildingStorefront } from "@medusajs/icons";
import { FocusModal, Heading } from "@medusajs/ui";
import { ReactNode } from "react";

interface ProductsPickerModalWrapperProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductsPickerModalWrapper = ({
  open,
  onOpenChange,
  children,
}: ProductsPickerModalWrapperProps) => {
  return (
    <FocusModal open={open} onOpenChange={onOpenChange}>
      <FocusModal.Trigger asChild>
        <button className="py-10 text-gray-600 w-full flex flex-col items-center px-5 border text-center bg-gray-50 hover:bg-gray-100 border-dashed border-gray-400 rounded-lg">
          <BuildingStorefront /> Cliquez ici pour choisir les produits
        </button>
      </FocusModal.Trigger>

      <FocusModal.Content className="max-w-xl m-auto pt-16 overflow-scroll">
        <FocusModal.Body className="flex flex-col px-6">
          <Heading className="mb-6">Choisissez des produits</Heading>

          {children}
        </FocusModal.Body>
      </FocusModal.Content>
    </FocusModal>
  );
};

export default ProductsPickerModalWrapper;
