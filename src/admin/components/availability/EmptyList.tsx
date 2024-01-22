import { Button } from "@medusajs/ui";
const EmptyList = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h1 className="text-3xl font-bold mb-2">Aucune disponibilité</h1>

      <p className="text-gray-500">Commencez par créer vos disponibilités</p>

      <Button className="mt-8">Créer une disponibilité</Button>
    </div>
  );
};

export default EmptyList;
