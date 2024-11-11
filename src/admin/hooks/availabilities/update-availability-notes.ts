import { useToast } from "@medusajs/ui";
import apiRequestKey from "../../constants/apiRequestKey";
import AvailabilityApiService from "../../services/AvailabilityApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AvailabilityNotes } from "../../types/api";
import getErrorMessage from "../../utils/get-error-message";

const useAvailabilityNotes = (availabilityId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateProductAvailability = (data: AvailabilityNotes) => {
    return AvailabilityApiService.updateNotes(availabilityId, data);
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: updateProductAvailability,
  });

  const onError = () => {
    toast({
      title: "Échec de l'opération",
      description:
        "Nous rencontrons des difficultés à mettre à jour les notes de la disponibilité.",
      variant: "error",
    });
  };

  const onSuccess = () => {
    toast({
      title: "Mise à jour réussi",
      description:
        "Les configurations de la disponibilité sont mis à jour avec succès.",
      variant: "success",
    });

    queryClient.invalidateQueries({
      queryKey: apiRequestKey.availabilities,
    });
  };

  const handleUpdate = async (data: AvailabilityNotes) => {
    try {
      const updateResult = await mutateAsync(data);
      if (updateResult?.data?.success) {
        onSuccess();
        return;
      }
      onError();
      return;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast({
        title:
          "Erreur lors de la mise à jour des configurations de la disponibilité",
        description: errorMessage,
        variant: "error",
      });
    }
  };

  return { handleUpdate, isUpdating: isLoading };
};

export default useAvailabilityNotes;
