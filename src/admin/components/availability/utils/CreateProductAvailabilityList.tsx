import { useEffect } from "react";
import { useField } from "formik";
import { Text } from "@medusajs/ui";
import { useAdminProducts } from "medusa-react";
import ProductAvailabilityItemField from "./ProductAvailabilityItemField";
import type { ProductLike } from "@/admin/types";
import { CreateAvailabilityProductItem } from "@/admin/types/api";
import FieldLabel from "../../inputs/Label";
import ProductsPicker from "./ProductPicker";
import ProductAvailabilityLoadingSkeleton from "./ProductAvailabilityLoadingSkeleton";

interface CreateProductAvailabilityListProps {
  selectAllProductAtInitial: boolean;
  selectedProducts: ProductLike[];
  productsToExcludeInPicker?: ProductLike[];
  onRemoveItem: (productId: string) => void;
  onSelectedProductsChange: (products: ProductLike[]) => void;
}

const CreateProductAvailabilityList = ({
  onRemoveItem,
  selectedProducts,
  onSelectedProductsChange,
  selectAllProductAtInitial,
  productsToExcludeInPicker = [],
}: CreateProductAvailabilityListProps) => {
  const { error, isLoading, products } = useAdminProducts();
  const [{ value }, , { setValue }] = useField<CreateAvailabilityProductItem[]>(
    "availabilityProducts",
  );
  useEffect(() => {
    // selected all product when products are loaded
    if (
      selectedProducts.length === 0 &&
      products &&
      selectAllProductAtInitial
    ) {
      handleSelectedProductsChange(products);
    }
  }, [products]);

  function handleSelectedProductsChange(products: ProductLike[]) {
    onSelectedProductsChange([...selectedProducts, ...products]);

    const newFormikValue = products.map((product) => ({
      quantity: 0,
      productId: product.id,
    }));

    setValue([...value, ...newFormikValue]);
  }

  const removeItemFromFormik = (productId: string) => {
    const newValue = value.filter((product) => product.productId !== productId);
    setValue(newValue);
  };

  if (isLoading) {
    return <ProductAvailabilityLoadingSkeleton />;
  }

  if (error) {
    return <p>Erreur de chargement</p>;
  }

  const allProductsToExcludeInPicker = [
    ...selectedProducts,
    ...productsToExcludeInPicker,
  ];
  const hasUnselectedProduct =
    products?.length > allProductsToExcludeInPicker.length;

  return (
    <>
      <div className="mt-4">
        <FieldLabel label="Définissez la disponibilité par produit" />

        <div className="mt-2 space-y-2">
          {selectedProducts.map((product, index) => {
            const onRemove = () => {
              onRemoveItem(product.id);
              removeItemFromFormik(product.id);
            };

            return (
              <ProductAvailabilityItemField
                onRemove={onRemove}
                key={product.id}
                productId={product.id}
                image={product.thumbnail}
                title={product.title}
                fieldName={`availabilityProducts[${index}]`}
              />
            );
          })}
        </div>
      </div>

      {hasUnselectedProduct ? (
        <ProductsPicker
          products={products}
          alreadySelectedProducts={allProductsToExcludeInPicker}
          onProductsSelected={handleSelectedProductsChange}
        />
      ) : (
        <Text className="bg-blue-10 text-blue-900 text-center rounded-lg p-4">
          Tous les produits sont déjà ajouté à cette disponibilité
        </Text>
      )}
    </>
  );
};

export default CreateProductAvailabilityList;
