import apiRequestKey from "../../constants/apiRequestKey";
import { useQueryClient } from "@tanstack/react-query";

const useInvalidateAvailabilityQuery = (availabilityId: string) => {
  const queryClient = useQueryClient();

  const invalidateAvailabilityQuery = () => {
    queryClient.invalidateQueries({
      queryKey: [...apiRequestKey.availabilities, availabilityId],
    });
  };

  return invalidateAvailabilityQuery;
};

export default useInvalidateAvailabilityQuery;
