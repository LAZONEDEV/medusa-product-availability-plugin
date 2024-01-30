import { Form, Formik, FormikHelpers } from "formik";
import { Button } from "@medusajs/ui";
import { ReactNode, useState } from "react";
import type { ProductLike } from "@/admin/types";
import { AnySchema } from "yup";
import CreateProductAvailabilityList from "../utils/CreateProductAvailabilityList";

interface CreateProductAvailabilitiesDumbFormProps<T> {
  initialValues: T;
  children?: ReactNode;
  validationSchema: AnySchema;
  productsToExcludeInPicker?: ProductLike[];
  selectAllProductAtInitial?: boolean;
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<any>;
}

function CreateProductAvailabilitiesDumbForm<T>({
  children,
  onSubmit,
  initialValues,
  validationSchema,
  selectAllProductAtInitial = true,
  productsToExcludeInPicker,
}: CreateProductAvailabilitiesDumbFormProps<T>) {
  const [selectedProducts, setSelectedProducts] = useState<ProductLike[]>([]);

  const onRemoveItem = (productId: string) => {
    setSelectedProducts((previous) => {
      return previous.filter((product) => product.id !== productId);
    });
  };

  return (
    <Formik<T>
      onReset={() => setSelectedProducts([])}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values }) => {
        const emptyProduct = values["availabilityProducts"].length < 1;

        return (
          <Form>
            <div className="mt-2">
              {children}

              <CreateProductAvailabilityList
                onRemoveItem={onRemoveItem}
                selectedProducts={selectedProducts}
                onSelectedProductsChange={setSelectedProducts}
                productsToExcludeInPicker={productsToExcludeInPicker}
                selectAllProductAtInitial={selectAllProductAtInitial}
              />

              <Button
                disabled={emptyProduct}
                type="submit"
                size="large"
                className="w-full mt-4"
              >
                Sauvegarder
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default CreateProductAvailabilitiesDumbForm;
