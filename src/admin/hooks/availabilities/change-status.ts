import { useToast } from "@medusajs/ui";
import apiRequestKey from "../../constants/apiRequestKey";
import AvailabilityApiService from "../../services/AvailabilityApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AvailabilityStatus } from "../../types/api";

const useChangeAvailabilityStatus = (
  availabilityId: string,
  status: AvailabilityStatus,
) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const onError = () => {
    toast({
      title: "Échec de l'opération",
      description:
        "Nous rencontrons des difficultés à mettre à jour l'état de la disponibilité.",
      variant: "error",
    });
  };

  const onSuccess = () => {
    toast({
      title: "État de la disponibilité mis à jour",
      description: "L'état de la disponibilité est mis à jour avec succès.",
      variant: "success",
    });

    queryClient.invalidateQueries({
      queryKey: apiRequestKey.availabilities,
    });
  };

  const stateUpdater = () => {
    const newState =
      status === AvailabilityStatus.Active
        ? AvailabilityStatus.Inactive
        : AvailabilityStatus.Active;

    return AvailabilityApiService.changeState(availabilityId, newState);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: stateUpdater,
    mutationKey: [...apiRequestKey.availabilities, availabilityId],
    onError,
    onSuccess,
  });

  return { onStatusChange: mutate, isChangingState: isLoading };
};

export default useChangeAvailabilityStatus;
