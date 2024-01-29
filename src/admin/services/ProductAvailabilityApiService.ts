import { APIResponse, OperationResult } from "@/types/api";
import medusaApiRoutes from "../constants/apiRoutes";
import medusaHttpClient from "../utils/medusaHttpClient";
import {
  AvailabilityProduct,
  CreateAvailabilityProductItem,
  UpdateAvailabilityProductItem,
} from "../types/api";
import type { CreateProductsAvailabilitiesDto } from "@/api/admin/product-availabilities/dtos/create-product-availabilities.dtos";

class ProductAvailabilityApiService {
  static path = medusaApiRoutes.productAvailability;

  static async delete(id: string): Promise<OperationResult> {
    try {
      const operationResult = await medusaHttpClient.delete<
        APIResponse<OperationResult>
      >(`${ProductAvailabilityApiService.path}/${id}`);

      return operationResult.data;
    } catch (error) {
      throw error;
    }
  }

  static async update(
    id: string,
    data: UpdateAvailabilityProductItem,
  ): Promise<OperationResult> {
    try {
      const operationResult = await medusaHttpClient.put<
        APIResponse<OperationResult>
      >(`${ProductAvailabilityApiService.path}/${id}`, data);

      return operationResult.data;
    } catch (error) {
      throw error;
    }
  }

  static async create(
    availabilityId: string,
    availabilityProducts: CreateAvailabilityProductItem[],
  ): Promise<AvailabilityProduct> {
    const createPayload: CreateProductsAvailabilitiesDto = {
      availabilityId,
      availabilityProducts,
    };

    try {
      const operationResult = await medusaHttpClient.post<
        APIResponse<AvailabilityProduct>
      >(`${ProductAvailabilityApiService.path}`, createPayload);

      return operationResult.data;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductAvailabilityApiService;
