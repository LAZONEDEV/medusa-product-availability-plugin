import { useToast } from "@medusajs/ui";
import apiRequestKey from "../../constants/apiRequestKey";
import AvailabilityApiService from "../../services/AvailabilityApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAvailabilityDeletion = (
  availabilityId: string,
  onDeleteSuccess: () => void,
) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const onError = (err: Error) => {
    const errorDescription =
      err.message ||
      "Nous rencontrons des difficultés à supprimer la disponibilité.";

    toast({
      title: "Echèc de suppression",
      description: errorDescription,
      variant: "error",
    });
  };

  const onSuccess = () => {
    toast({
      title: "Disponibilité supprimée",
      description: "La disponibilité est supprimée avec succès",
      variant: "success",
    });

    queryClient.invalidateQueries({
      queryKey: apiRequestKey.availabilities,
    });
    onDeleteSuccess();
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => AvailabilityApiService.deleteById(availabilityId),
    mutationKey: [...apiRequestKey.availabilities, availabilityId],
    onError,
    onSuccess,
  });

  return { onDelete: mutate, isDeleting: isLoading };
};

export default useAvailabilityDeletion;
