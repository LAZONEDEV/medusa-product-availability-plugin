import { Form, Formik } from "formik";
import { Button } from "@medusajs/ui";
import DateField from "../../inputs/DateInput";
import CreateProductAvailabilityList from "./CreateProductAvailabilityList";
import { createAvailabilitySchema } from "../../../utils/validationSchema";
import { CreateAvailabilityDto } from "../../../types/api";
import { useCreateAvailabilityMutation } from "../../../hooks/availabilities";
import { useState } from "react";
import type { ProductLike } from "@/admin/types";

const defaultValue = { date: new Date(), availabilityProducts: [] };

const CreateAvailabilityForm = () => {
  const [selectedProducts, setSelectedProducts] = useState<ProductLike[]>([]);
  const handleSubmit = useCreateAvailabilityMutation();

  const onRemoveItem = (productId: string) => {
    setSelectedProducts((previous) => {
      return previous.filter((product) => product.id !== productId);
    });
  };

  return (
    <Formik<CreateAvailabilityDto>
      initialValues={defaultValue}
      onSubmit={handleSubmit}
      validationSchema={createAvailabilitySchema}
    >
      {({ values }) => {
        const emptyProduct = values["availabilityProducts"].length < 1;

        return (
          <Form>
            <div className="mt-2">
              <DateField
                name="date"
                label="Choisissez la date de disponibilité"
              />

              <CreateProductAvailabilityList
                onRemoveItem={onRemoveItem}
                selectedProducts={selectedProducts}
                onSelectedProductsChange={setSelectedProducts}
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
};

export default CreateAvailabilityForm;
