import AddNewAvailabilityBtn from "./AddNewButton";

const EmptyList = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h1 className="text-3xl font-bold mb-2">Aucune disponibilité</h1>

      <p className="text-gray-500 mb-4">
        Commencez par créer vos disponibilités
      </p>

      <AddNewAvailabilityBtn>Créer une disponibilité</AddNewAvailabilityBtn>
    </div>
  );
};

export default EmptyList;
