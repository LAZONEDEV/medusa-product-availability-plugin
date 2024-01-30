import { AvailabilityProduct } from "@/admin/types/api";
import { Form, Formik } from "formik";
import { useState } from "react";
import AvailabilityDetailProductItem from "./AvailabilityDetailProductItem";
import useDeleteProductAvailability from "../../../hooks/productAvailability/deleteProductAvailability";
import DeleteProductAvailabilityPrompt from "./DeleteProductAvailabilityPrompt";
import useUpdateProductAvailability from "../../../hooks/productAvailability/updateProductAvailability";
import { updateProductAvailabilitySchema } from "../../../utils/validationSchema";

interface EditableAvailabilityDetailProductProps {
  productAvailability: AvailabilityProduct;
  availabilityId: string;
}

const EditableAvailabilityDetailProduct = ({
  availabilityId,
  productAvailability: { product, quantity, id },
}: EditableAvailabilityDetailProductProps) => {
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const { handleDeletion, isDeleting } = useDeleteProductAvailability(
    id,
    availabilityId,
  );
  const { handleUpdate } = useUpdateProductAvailability(id, availabilityId);

  return (
    <>
      <DeleteProductAvailabilityPrompt
        open={deleteModalOpened}
        onOpenChange={setDeleteModalOpened}
        onRemove={handleDeletion}
        onCancel={() => setDeleteModalOpened(false)}
        productTitle={product.title}
      />

      <Formik
        initialValues={{ quantity }}
        validationSchema={updateProductAvailabilitySchema}
        onSubmit={handleUpdate}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <AvailabilityDetailProductItem
                image={product.thumbnail}
                title={product.title}
                isSubmitting={isSubmitting}
                isRemoving={isDeleting}
                key={product.id}
                onRemove={() => setDeleteModalOpened(true)}
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default EditableAvailabilityDetailProduct;
