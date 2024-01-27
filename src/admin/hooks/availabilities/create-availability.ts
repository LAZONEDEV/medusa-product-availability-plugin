import { FormikHelpers } from "formik";
import { useToast } from "@medusajs/ui";
import { useNavigate } from "react-router-dom";

import { CreateAvailabilityDto } from "../../types/api";
import BadRequestHttpClientError from "../../errors/BadRequestHttpClientError";
import { fieldErrorsToFormikErrors } from "../../utils/fieldErrorToFormikError";
import AvailabilityApiService from "../../services/AvailabilityApiService";
import adminRoutes from "../../constants/adminRoutes";

export const useCreateAvailabilityMutation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (
    values: CreateAvailabilityDto,
    formikHelpers: FormikHelpers<CreateAvailabilityDto>,
  ) => {
    try {
      await AvailabilityApiService.create(values);

      toast({
        title: "Disponibilité créée",
        description: "La disponibilité est créée avec succès",
        variant: "success",
      });

      navigate(adminRoutes.availabilities);
    } catch (error) {
      toast({
        title: "Échec de création de la disponibilité",
        description: error.message,
        variant: "error",
      });
      if (error instanceof BadRequestHttpClientError) {
        const formikErrors = fieldErrorsToFormikErrors(error.payload);
        formikHelpers.setErrors(formikErrors);
      }

      if (error.message === "VALIDATION_ERROR") {
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
