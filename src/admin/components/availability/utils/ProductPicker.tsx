import { Button } from "@medusajs/ui";
import ProductPickerItem from "./ProductPickerItem";
import ProductsPickerModalWrapper from "./ProductsPickerModalWrapper";
import { useMemo, useState } from "react";
import { ProductLike } from "@/admin/types";

interface ProductsPickerProps {
  products: ProductLike[];
  alreadySelectedProducts: ProductLike[];
  onProductsSelected: (products: ProductLike[]) => void;
}

const ProductsPicker = ({
  products = [],
  onProductsSelected,
  alreadySelectedProducts,
}: ProductsPickerProps) => {
  const [open, setOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<ProductLike[]>([]);

  const availableProductsForSelection = useMemo(() => {
    // keep trace for already selected products
    const selectedProductsMap = alreadySelectedProducts.reduce<
      Record<string, boolean>
    >((acc, currentItem) => {
      acc[currentItem.id!] = true;
      return acc;
    }, {});

    // filter out not already selected products
    return (
      products?.filter((product) => {
        return !selectedProductsMap[product.id!];
      }) || []
    );
  }, [products, alreadySelectedProducts]);

  const includedProducts = (
    products: ProductLike[],
    selectedProduct: ProductLike,
  ) => {
    return products.some((product) => product.id === selectedProduct.id);
  };

  const handleItemCheckedChange = (relatedProduct: ProductLike) => {
    const inSelectedProduct = includedProducts(
      selectedProducts,
      relatedProduct,
    );
    if (inSelectedProduct) {
      setSelectedProducts((previous) => {
        return previous.filter((product) => product.id !== relatedProduct.id);
      });
      return;
    }

    setSelectedProducts((previous) => {
      return [...previous, relatedProduct];
    });
  };

  const onProductsSelectedHandler = () => {
    onProductsSelected(selectedProducts);
    setSelectedProducts([]);
    setOpen(false);
  };

  return (
    <div className="mt-2">
      <ProductsPickerModalWrapper open={open} onOpenChange={setOpen}>
        <div className="space-y-2">
          {availableProductsForSelection.map((product) => {
            const selected = includedProducts(selectedProducts, product);

            return (
              <ProductPickerItem
                key={product.id}
                checked={selected}
                title={product.title || ""}
                image={product.thumbnail || ""}
                onChange={() => handleItemCheckedChange(product)}
              />
            );
          })}
        </div>

        <Button
          size="large"
          className="w-full mt-4"
          onClick={onProductsSelectedHandler}
        >
          Ajouter la sélection
        </Button>
      </ProductsPickerModalWrapper>
    </div>
  );
};

export default ProductsPicker;
