import { useToast } from "@medusajs/ui";
import apiRequestKey from "../../constants/apiRequestKey";
import AvailabilitySettingApiService from "../../services/AvailabilitySettingApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import getErrorMessage from "../../utils/get-error-message";
import { AvailabilitySettingName } from "../../types/api";

const useAvailabilitySetting = (settingName: AvailabilitySettingName) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateAvailabilitySetting = (data: Record<string, string>) => {
    return AvailabilitySettingApiService.update(settingName, data);
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: updateAvailabilitySetting,
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
      description: "Les notes de la disponibilité sont mis à jour avec succès.",
      variant: "success",
    });

    queryClient.invalidateQueries({
      queryKey: apiRequestKey.availabilitySetting,
    });
  };

  const handleUpdate = async (data: Record<string, string>) => {
    try {
      const updateResult = await mutateAsync(data);
      if (updateResult?.success) {
        onSuccess();
        return;
      }
      onError();
      return;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast({
        title: "Erreur lors de la mise à jour de la disponibilité",
        description: errorMessage,
        variant: "error",
      });
    }
  };

  return { handleUpdate, isUpdating: isLoading };
};

export default useAvailabilitySetting;
