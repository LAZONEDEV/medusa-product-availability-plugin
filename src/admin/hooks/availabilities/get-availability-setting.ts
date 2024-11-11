import { useQuery } from "@tanstack/react-query";

import apiRequestKey from "../../constants/apiRequestKey";
import AvailabilitySettingApiService from "../../services/AvailabilitySettingApiService";

export const useGetAvailabilitySettings = () => {
  const fetchSetting = () => {
    return AvailabilitySettingApiService.getAll();
  };

  const queryKey = [...apiRequestKey.availabilitySetting];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: fetchSetting,
  });

  return {
    isLoading,
    data,
    refetch,
    error,
  };
};
