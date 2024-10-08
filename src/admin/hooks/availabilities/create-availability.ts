import { FormikHelpers } from "formik";
import { useToast } from "@medusajs/ui";
import { useNavigate } from "react-router-dom";

import { CreateAvailabilityDto } from "../../types/api";
import BadRequestHttpClientError from "../../errors/BadRequestHttpClientError";
import { fieldErrorsToFormikErrors } from "../../utils/fieldErrorToFormikError";
import AvailabilityApiService from "../../services/AvailabilityApiService";
import adminRoutes from "../../constants/adminRoutes";
import { useQueryClient } from "@tanstack/react-query";
import apiRequestKey from "../../constants/apiRequestKey";
import getErrorMessage from "../../utils/get-error-message";

export const useCreateAvailabilityMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleSubmit = async (
    { date, availabilityProducts }: CreateAvailabilityDto,
    formikHelpers: FormikHelpers<CreateAvailabilityDto>,
  ) => {
    try {
      // transform the date into this format : YYYY-MM-DD
      // to ensure that we don't UTC to the backend
      const availabilityDate = new Date(date);
      const month = String(availabilityDate.getMonth() + 1).padStart(2, "0");
      const day = String(availabilityDate.getDate()).padStart(2, "0");

      const formattedDate = `${availabilityDate.getFullYear()}-${month}-${day}`;

      await AvailabilityApiService.create({
        availabilityProducts,
        date: formattedDate,
      });

      toast({
        title: "Disponibilité créée",
        description: "La disponibilité est créée avec succès",
        variant: "success",
      });

      // force refresh availabilities list
      queryClient.invalidateQueries({
        queryKey: apiRequestKey.availabilities,
      });
      navigate(adminRoutes.availabilities);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast({
        title: "Échec de création de la disponibilité",
        description: errorMessage,
        variant: "error",
      });
      if (error instanceof BadRequestHttpClientError) {
        const formikErrors = fieldErrorsToFormikErrors(error.payload || []);
        console.log(formikErrors);
        formikHelpers.setErrors(formikErrors);
      }

      if (errorMessage === "Validation error") {
        toast({
          title: "Informations incorrectes",
          description:
            "Veuillez corriger les erreurs du formulaire et réessayez",
          variant: "error",
        });
        return;
      }
    }
  };

  return handleSubmit;
};
