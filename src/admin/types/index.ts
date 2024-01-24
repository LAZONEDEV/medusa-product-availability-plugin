import { Product } from "@medusajs/medusa";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";

export type ProductLike = Product | PricedProduct;
