import { useMutation } from "@tanstack/react-query";
import ProductAvailabilityApiService from "../../services/ProductAvailabilityApiService";
import { useToast } from "@medusajs/ui";
import {
  CreateAvailabilityProductItem,
  UpdateProductAvailabilitiesDto,
} from "@/admin/types/api";
import useInvalidateAvailabilityQuery from "./useInvalidateAvailabilityQuery";
import { FormikHelpers } from "formik";
import BadRequestHttpClientError from "../../errors/BadRequestHttpClientError";
import { fieldErrorsToFormikErrors } from "../../utils/fieldErrorToFormikError";

const useCreateNewProductAvailabilities = (availabilityId: string) => {
  const { toast } = useToast();
  const invalidateAvailabilityQuery =
    useInvalidateAvailabilityQuery(availabilityId);

  const createNewProductAvailabilities = (
    data: CreateAvailabilityProductItem[],
  ) => {
    return ProductAvailabilityApiService.create(availabilityId, data);
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: createNewProductAvailabilities,
  });

  const handleCreation = async (
    data: UpdateProductAvailabilitiesDto,
    formikHelpers: FormikHelpers<UpdateProductAvailabilitiesDto>,
  ) => {
    try {
      await mutateAsync(data.availabilityProducts);
      toast({
        title: "Opération réussie",
        description:
          "Les disponibilités de produit ont été ajoutées avec succès",
        variant: "success",
      });
      formikHelpers.resetForm();
      invalidateAvailabilityQuery();
    } catch (error) {
      toast({
        title: "Échec de création des disponibilités",
        description:
          error.message ||
          "La création des disponibilités de produits a échoué",
        variant: "error",
      });

      if (error instanceof BadRequestHttpClientError) {
        const formikErrors = fieldErrorsToFormikErrors(error.payload);
        formikHelpers.setErrors(formikErrors);
      }
    }
  };

  return { handleCreation, isLoading };
};

export default useCreateNewProductAvailabilities;
