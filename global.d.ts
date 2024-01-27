import { AvailabilityProduct } from "./src/models/product-availability";

declare module "@medusajs/medusa" {
  interface Product {
    availabilities: AvailabilityProduct[];
  }

  interface Order {
    availability: Availability;
  }
}
