import { Container, Heading } from "@medusajs/ui";
import { Form, Formik } from "formik";
import { Availability } from "@/admin/types/api";
import useAvailabilityNotes from "../../../hooks/availabilities/update-availability-notes";
import AvailabilityNotesForm from "./AvailabilityNotesForm";

interface AvailabilityNotesProps
  extends Pick<Availability, "withdrawNote" | "deliveryNote"> {
  availabilityId: string;
}
const AvailabilityNotes = ({
  withdrawNote,
  deliveryNote,
  availabilityId,
}: AvailabilityNotesProps) => {
  const initialValues = {
    withdrawNote,
    deliveryNote,
  };

  const { handleUpdate } = useAvailabilityNotes(availabilityId);

  return (
    <Container className="mt-8">
      <Heading level="h2" className="mb-4">
        Notes pour votre disponibilité
      </Heading>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await handleUpdate(values);
        }}
      >
        {({ values }) => (
          <Form>
            <AvailabilityNotesForm
              canSubmit={
                initialValues &&
                JSON.stringify(initialValues) !== JSON.stringify(values)
              }
            />
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AvailabilityNotes;
