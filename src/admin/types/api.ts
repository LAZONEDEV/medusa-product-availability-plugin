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

export interface Availability {
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

export interface Product {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  title: string;
  subtitle: null;
  description: string;
  handle: string;
  is_giftcard: boolean;
  status: string;
  thumbnail: string;
  weight: number;
  length: null;
  height: null;
  width: null;
  hs_code: null;
  origin_country: null;
  mid_code: null;
  material: null;
  collection_id: null;
  type_id: null;
  discountable: boolean;
  external_id: null;
  metadata: null;
}

export interface CreateAvailabilityProductItem {
  productId: string;
  quantity: number;
}

export interface CreateAvailabilityDto {
  date: Date;
  availabilityProducts: CreateAvailabilityProductItem[];
}

export interface UpdateAvailabilityProductItem {
  quantity: number;
}
