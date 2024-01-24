import { useQuery } from "@tanstack/react-query";
import { GetAvailabilityResponse } from "../types/api";
import medusaHttpClient from "../utils/medusaHttpClient";
import medusaApiRoutes from "../constants/apiRoutes";
import apiRequestKey from "../constants/apiRequestKey";
import { useSearchParams } from "react-router-dom";
import { AVAILABILITY_PER_PAGE } from "../configs/pagination";

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
