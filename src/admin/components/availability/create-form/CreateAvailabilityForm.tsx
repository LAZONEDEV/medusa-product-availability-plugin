import DateField from "../../inputs/DateInput";
import { createAvailabilitySchema } from "../../../utils/validationSchema";
import { CreateAvailabilityDto } from "../../../types/api";
import { useCreateAvailabilityMutation } from "../../../hooks/availabilities/create-availability";
import CreateProductAvailabilitiesDumbForm from "../dumbs/CreateProductsAvailabilitiesForm";
import AvailabilityNotesForm from "../detail-page/AvailabilityNotesForm";

const defaultValue = { date: new Date(), availabilityProducts: [] };
interface CreateAvailabilityFormProps {
  hasAvailabilityNotesForm?: boolean;
}
const CreateAvailabilityForm = ({
  hasAvailabilityNotesForm = false,
}: CreateAvailabilityFormProps) => {
  const handleSubmit = useCreateAvailabilityMutation();

  return (
    <CreateProductAvailabilitiesDumbForm<CreateAvailabilityDto>
      initialValues={defaultValue}
      onSubmit={handleSubmit}
      validationSchema={createAvailabilitySchema}
      hasAvailabilityNotesForm={hasAvailabilityNotesForm}
    >
      <DateField name="date" label="Choisissez la date de disponibilité" />
    </CreateProductAvailabilitiesDumbForm>
  );
};

export default CreateAvailabilityForm;
