import { useMutation } from "@tanstack/react-query";
import { useToast } from "@medusajs/ui";
import ProductAvailabilityApiService from "../../services/ProductAvailabilityApiService";
import useInvalidateAvailabilityQuery from "./useInvalidateAvailabilityQuery";
import getErrorMessage from "../../utils/get-error-message";

const useDeleteProductAvailability = (id: string, availabilityId: string) => {
  const { toast } = useToast();
  const invalidateAvailabilityQuery =
    useInvalidateAvailabilityQuery(availabilityId);

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

        invalidateAvailabilityQuery();

        return;
      }

      toast({
        title: "Echec de suppression",
        description: "La suppression de la disponibilité du produit a échoué",
        variant: "error",
      });
      return;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast({
        title: "Erreur lors de la suppression",
        description: errorMessage,
        variant: "error",
      });
    }
  };

  return { handleDeletion, isDeleting: isLoading };
};

export default useDeleteProductAvailability;
