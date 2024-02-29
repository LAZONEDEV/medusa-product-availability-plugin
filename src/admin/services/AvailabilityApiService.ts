import { APIResponse, OperationResult } from "@/types/api";
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

  static async getById(id: string): Promise<Availability> {
    try {
      const availability = await medusaHttpClient.get<
        APIResponse<Availability>
      >(`${AvailabilityApiService.path}/${id}`);

      return availability.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteById(id: string): Promise<OperationResult> {
    try {
      const availability = await medusaHttpClient.delete<
        APIResponse<OperationResult>
      >(`${AvailabilityApiService.path}/${id}`);

      return availability.data;
    } catch (error) {
      throw error;
    }
  }
}

export default AvailabilityApiService;
