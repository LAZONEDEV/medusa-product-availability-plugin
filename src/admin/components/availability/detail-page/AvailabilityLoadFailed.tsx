import { Heading, Text, Button } from "@medusajs/ui";

interface AvailabilityLoadFailedProps {
  onRetry: () => {};
}

const AvailabilityLoadFailed = ({ onRetry }: AvailabilityLoadFailedProps) => {
  return (
    <section className="h-full flex flex-col space-y-3 justify-center items-center">
      <Heading level="h3" className="text-center text-lg">
        Échec de chargement
      </Heading>
      <Text className="max-w-xs text-gray-600 text-center">
        Une erreur est survenue lors du chargement de la disponibilité.
      </Text>

      <Button onClick={onRetry}>Réessayer</Button>
    </section>
  );
};

export default AvailabilityLoadFailed;
