import { AvailabilitiesList } from "../../components/availability/AvailabilitiesList";
import { RouteConfig } from "@medusajs/admin";
import { Calendar } from "@medusajs/icons";
import { Container, Heading, Toaster } from "@medusajs/ui";
import AddNewAvailabilityBtn from "../../components/availability/AddNewButton";

const CustomPage = () => {
  return (
    <>
      <Toaster />

      <div className="flex items-start justify-between mt-2 mb-5">
        <div>
          <Heading>Disponibilités</Heading>

          <p className="max-w-3xl text-gray-500">Gérez vos disponibilités</p>
        </div>

        <AddNewAvailabilityBtn>Ajouter</AddNewAvailabilityBtn>
      </div>

      <Container>
        <AvailabilitiesList />
      </Container>
    </>
  );
};

export const config: RouteConfig = {
  link: {
    label: "Disponibilités",
    icon: Calendar,
  },
};

export default CustomPage;
