import { APIResponse, OperationResult } from "@/types/api";
import medusaApiRoutes from "../constants/apiRoutes";
import medusaHttpClient from "../utils/medusaHttpClient";
import { AvailabilitySetting, AvailabilitySettingName } from "../types/api";

class AvailabilityApiService {
  static path = medusaApiRoutes.availabilitySetting;

  static async getAll() {
    try {
      const result = await medusaHttpClient.get<
        APIResponse<AvailabilitySetting[]>
      >(`${AvailabilityApiService.path}`);
      return result?.data!;
    } catch (error) {
      throw error;
    }
  }

  static async update(
    settingName: AvailabilitySettingName,
    data: Record<string, string>,
  ) {
    try {
      const result = await medusaHttpClient.put<APIResponse<OperationResult>>(
        `${AvailabilityApiService.path}/${settingName}`,
        data,
      );
      return result!.data;
    } catch (error) {
      throw error;
    }
  }
}

export default AvailabilityApiService;
