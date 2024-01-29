import { useMutation } from "@tanstack/react-query";
import { useToast } from "@medusajs/ui";

import ProductAvailabilityApiService from "../../services/ProductAvailabilityApiService";
import type { UpdateAvailabilityProductItem } from "@/admin/types/api";

const useUpdateProductAvailability = (id: string) => {
  const { toast } = useToast();

  const updateProductAvailability = (data: UpdateAvailabilityProductItem) => {
    return ProductAvailabilityApiService.update(id, data);
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: updateProductAvailability,
  });

  const handleUpdate = async (data: UpdateAvailabilityProductItem) => {
    try {
      const updateResult = await mutateAsync(data);
      if (updateResult.success) {
        toast({
          title: "Mise à jour effectuée.",
          description:
            "La mise à jour, de la disponibilité du produit est effectuée avec succès.",
        });
        return;
      }

      toast({
        title: "Échec de mise à jour",
        description: "La mise à jour de la disponibilité du produit a échoué.",
      });
      return;
    } catch (error) {
      toast({
        title: "Erreur lors de la mise à jour de la disponibilité",
        description: error.message,
        variant: "error",
      });
    }
  };

  return { handleUpdate, isUpdating: isLoading };
};

export default useUpdateProductAvailability;
