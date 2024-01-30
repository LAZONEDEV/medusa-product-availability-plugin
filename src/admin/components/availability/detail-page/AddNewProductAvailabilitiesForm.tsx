import { Container, Heading } from "@medusajs/ui";
import { useMemo } from "react";
import { createAvailabilitiesSchema } from "../../../utils/validationSchema";
import useCreateNewProductAvailabilities from "../../../hooks/productAvailability/createNewProductAvailabilities";
import { useGetAvailability } from "../../../hooks/availabilities/get-availability";
import CreateProductAvailabilitiesDumbForm from "../dumbs/CreateProductsAvailabilitiesForm";
import { UpdateProductAvailabilitiesDto } from "@/admin/types/api";
import { ProductLike } from "@/admin/types";

const defaultValue = { availabilityProducts: [] };

interface AddNewProductAvailabilitiesFormProps {
  availabilityId: string;
}

const AddNewProductAvailabilitiesForm = ({
  availabilityId,
}: AddNewProductAvailabilitiesFormProps) => {
  const { data } = useGetAvailability();
  const { handleCreation } = useCreateNewProductAvailabilities(availabilityId);
  const availabilityProducts = useMemo(() => {
    return data.availabilityProducts.map(
      (item) => item.product as unknown as ProductLike,
    );
  }, [data]);

  return (
    <Container className="max-w-2xl mt-8">
      <Heading level="h2" className="mb-4">
        Ajoutez de nouvelles disponibilités de produits
      </Heading>

      <CreateProductAvailabilitiesDumbForm<UpdateProductAvailabilitiesDto>
        selectAllProductAtInitial={false}
        onSubmit={handleCreation}
        initialValues={defaultValue}
        validationSchema={createAvailabilitiesSchema}
        productsToExcludeInPicker={availabilityProducts}
      />
    </Container>
  );
};

export default AddNewProductAvailabilitiesForm;
