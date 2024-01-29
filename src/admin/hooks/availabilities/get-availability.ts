import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import apiRequestKey from "../../constants/apiRequestKey";
import AvailabilityApiService from "../../services/AvailabilityApiService";

export const useGetAvailability = () => {
  const { availabilityId } = useParams();

  const fetchAvailability = () => {
    return AvailabilityApiService.getById(availabilityId);
  };

  const queryKey = [...apiRequestKey.availabilities, availabilityId];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: fetchAvailability,
  });

  return {
    isLoading,
    data,
    refetch,
    error,
    availabilityId,
  };
};
