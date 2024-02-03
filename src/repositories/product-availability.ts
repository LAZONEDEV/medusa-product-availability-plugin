import { Repository } from "typeorm";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { Order } from "@medusajs/medusa";
import { AvailabilityProduct } from "@/models/product-availability";

export const AvailabilityProductRepository = dataSource
  .getRepository(AvailabilityProduct)
  .extend({
    async getPlacedOrderQuantity(
      productAvailabilityId: string,
      orderRepo: Repository<Order>,
    ): Promise<number> {
      const result = await orderRepo
        .createQueryBuilder("order")
        .innerJoin("order.availability", "availability")
        .innerJoin("availability.availabilityProducts", "availability_product")
        .innerJoin("order.items", "line_item")
        .innerJoin("line_item.variant", "product_variant")
        .innerJoin("product_variant.product", "product")
        .where("availability_product.id = :productAvailabilityId", {
          productAvailabilityId,
        })
        .andWhere("product.id = availability_product.product.id")
        .andWhere(`order.status != :canceled`, { canceled: "canceled" })
        .select("SUM(line_item.quantity)", "totalOrderedQuantity")
        .getRawOne();

      return result.totalOrderedQuantity || 0;
    },
  });

export default AvailabilityProductRepository;
