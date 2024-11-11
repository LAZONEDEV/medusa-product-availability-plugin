import { Product } from "@medusajs/medusa";

export interface GetAvailabilityResponse {
  data: {
    availabilities: Availability[];
    totalCount: number;
  };
}

export enum AvailabilityStatus {
  Active = "active",
  Inactive = "inactive",
}

export interface Availability extends AvailabilityNotes {
  id: string;
  created_at: Date;
  updated_at: Date;
  status: AvailabilityStatus;
  date: Date;
  availabilityProducts: AvailabilityProduct[];
}

export interface AvailabilityProduct {
  id: string;
  created_at: Date;
  updated_at: Date;
  quantity: number;
  product: Product;
}

export interface CreateAvailabilityProductItem {
  productId: string;
  quantity: number | null;
}
export interface AvailabilityNotes {
  withdrawNote?: string;
  deliveryNote?: string;
}

export interface CreateAvailabilityDto {
  date: Date | string;
  availabilityProducts: CreateAvailabilityProductItem[];
}

export interface UpdateProductAvailabilitiesDto {
  availabilityProducts: CreateAvailabilityProductItem[];
}

export interface UpdateAvailabilityProductItem {
  quantity: number;
}

export interface AvailabilitySetting {
  id: string;
  configName: string;
  value: Record<string, string>;
}

export enum AvailabilitySettingName {
  defaultWithdrawAndDeliveryInfo = "defaultWithdrawAndDeliveryInfo",
}
