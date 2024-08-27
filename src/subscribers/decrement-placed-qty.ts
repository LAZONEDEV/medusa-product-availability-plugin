import AvailabilityService from "@/services/availability";
import {
  OrderService,
  SubscriberArgs,
  SubscriberConfig,
} from "@medusajs/medusa";

type OrderCancelEvent = {
  id: string;
};

export default async function orderCanceledHandler({
  data,
  container,
}: SubscriberArgs<OrderCancelEvent>) {
  const availabilityService: AvailabilityService = container.resolve(
    "availabilityService",
  );

  await availabilityService.rollbackPlacedQuantities(data.id);
}

export const config: SubscriberConfig = {
  event: OrderService.Events.CANCELED,
};
