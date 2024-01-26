import CreateAvailabilityForm from "../../../components/availability/create-form/CreateAvailabilityForm";
import { Container, Heading, Text, Toaster } from "@medusajs/ui";

const Page = () => {
  return (
    <div className="flex justify-center">
      <Toaster />

      <div className="max-w-2xl w-[50vw]">
        <Heading level="h1">Ajouter une disponibilité</Heading>

        <Text className="text-gray-500 mb-4">
          Remplissez le formulaire ci-dessous pour ajouter une nouvelle
          disponibilité
        </Text>

        <Container>
          <CreateAvailabilityForm />
        </Container>
      </div>
    </div>
  );
};

export default Page;
