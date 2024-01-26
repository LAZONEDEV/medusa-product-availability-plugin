import medusaApiRoutes from "../constants/apiRoutes";
import { Availability, CreateAvailabilityDto } from "../types/api";
import medusaHttpClient from "../utils/medusaHttpClient";

class AvailabilityApiService {
  static path = medusaApiRoutes.availabilities;

  static async create(payload: CreateAvailabilityDto) {
    try {
      const availabilities = medusaHttpClient.post<Availability>(
        AvailabilityApiService.path,
        payload,
      );

      return availabilities;
    } catch (error) {
      throw error;
    }
  }
}

export default AvailabilityApiService;
