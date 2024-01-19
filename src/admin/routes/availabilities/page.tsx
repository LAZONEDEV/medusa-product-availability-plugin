import { AvailabilitiesList } from "../../_components/availability/AvailabilitiesLists";
import { RouteConfig } from "@medusajs/admin";
import { Calendar, Plus } from "@medusajs/icons";
import { Container, Heading, Button } from "@medusajs/ui";

const CustomPage = () => {
  return (
    <>
      <div className="flex items-start justify-between mt-2 mb-5">
        <div>
          <Heading>Disponibilités</Heading>

          <p className="max-w-3xl text-gray-500">Gérez vos disponibilités</p>
        </div>

        <Button variant="secondary">
          <Plus /> Ajouter
        </Button>
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
