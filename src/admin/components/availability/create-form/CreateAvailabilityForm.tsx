import DateField from "../../inputs/DateInput";
import { createAvailabilitySchema } from "../../../utils/validationSchema";
import { CreateAvailabilityDto } from "../../../types/api";
import { useCreateAvailabilityMutation } from "../../../hooks/availabilities/create-availability";
import CreateProductAvailabilitiesDumbForm from "../dumbs/CreateProductsAvailabilitiesForm";

const defaultValue = { date: new Date(), availabilityProducts: [] };

const CreateAvailabilityForm = () => {
  const handleSubmit = useCreateAvailabilityMutation();

  return (
    <CreateProductAvailabilitiesDumbForm<CreateAvailabilityDto>
      initialValues={defaultValue}
      onSubmit={handleSubmit}
      validationSchema={createAvailabilitySchema}
    >
      <DateField name="date" label="Choisissez la date de disponibilité" />
    </CreateProductAvailabilitiesDumbForm>
  );
};

export default CreateAvailabilityForm;
