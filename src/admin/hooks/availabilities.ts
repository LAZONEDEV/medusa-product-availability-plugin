import { useQuery } from "@tanstack/react-query";
import { FormikHelpers } from "formik";
import { useToast } from "@medusajs/ui";
import { useSearchParams, useNavigate } from "react-router-dom";

import { CreateAvailabilityDto, GetAvailabilityResponse } from "../types/api";
import medusaHttpClient from "../utils/medusaHttpClient";
import medusaApiRoutes from "../constants/apiRoutes";
import apiRequestKey from "../constants/apiRequestKey";
import { AVAILABILITY_PER_PAGE } from "../configs/pagination";
import BadRequestHttpClientError from "../errors/BadRequestHttpClientError";
import { fieldErrorsToFormikErrors } from "../utils/fieldErrorToFormikError";
import AvailabilityApiService from "../services/AvailabilityApiService";
import adminRoutes from "../constants/adminRoutes";

export const useGetAvailabilities = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 0;

  const requestUrl = `${medusaApiRoutes.availabilities}?page=${currentPage}&limit=${AVAILABILITY_PER_PAGE}`;

  const { data, isLoading, error, refetch } = useQuery({
    queryFn: () => medusaHttpClient.get<GetAvailabilityResponse>(requestUrl),
    queryKey: [...apiRequestKey.availabilities, currentPage],
  });

  const availabilities = data?.data.availabilities;
  const totalAvailabilitiesCount = data?.data.totalCount;

  const pageCount = Math.ceil(totalAvailabilitiesCount / AVAILABILITY_PER_PAGE);
  const canPreviousPage = currentPage !== 0;
  const canNextPage = currentPage !== pageCount;

  const nextPage = () => {
    if (canNextPage) {
      setSearchParams({ page: String(currentPage + 1) });
    }
  };

  const previousPage = () => {
    if (canPreviousPage) {
      setSearchParams({ page: String(currentPage - 1) });
    }
  };

  return {
    isLoading,
    error,
    availabilities,
    pageCount,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    currentPage,
    refetch,
    pageSize: AVAILABILITY_PER_PAGE,
  };
};

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
