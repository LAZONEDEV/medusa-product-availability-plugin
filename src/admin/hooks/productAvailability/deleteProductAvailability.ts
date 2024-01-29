import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@medusajs/ui";
import ProductAvailabilityApiService from "../../services/ProductAvailabilityApiService";
import apiRequestKey from "../../constants/apiRequestKey";

const useDeleteProductAvailability = (id: string, availabilityId) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteProductAvailability = async () => {
    return ProductAvailabilityApiService.delete(id);
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: deleteProductAvailability,
  });

  const handleDeletion = async () => {
    try {
      const deletionResult = await mutateAsync();
      if (deletionResult.success) {
        toast({
          title: "Opération réussie",
          description: "La disponibilité du produit est supprimée avec succès",
          variant: "success",
        });

        // force availability to refresh
        queryClient.invalidateQueries({
          queryKey: [...apiRequestKey.availabilities, availabilityId],
        });

        return;
      }

      toast({
        title: "Echec de suppression",
        description: "La suppression de la disponibilité du produit a échoué",
        variant: "error",
      });
      return;
    } catch (error) {
      toast({
        title: "Erreur lors de la suppression",
        description: error.message,
        variant: "error",
      });
    }
  };

  return { handleDeletion, isDeleting: isLoading };
};

export default useDeleteProductAvailability;
