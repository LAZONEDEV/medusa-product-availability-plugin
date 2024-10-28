import { ProductService } from "@medusajs/medusa";
import { Modules } from "@medusajs/utils";
import { medusaIntegrationTestRunner } from "medusa-test-utils";
import type AvailabilityService from "../../src/services/availability";
import dayjs from "dayjs";

/**
 * This test is about to ensure a good management of the race condition.
 * By race condition, we mean what will happen is two clients try to complete
 * their carts on the same time while the remaining quantities can
 * not satisfy the both orders.
 * The expected behavior suggest that the first client whose request is
 * handled first will be able to complete his cart by the second couldn't.
 * The first client is named Bob and the second Alice.
 */

medusaIntegrationTestRunner({
  dbName: process.env.DATABASE_NAME,
  testSuite: ({ api, getContainer }) => {
    describe("Testing race condition", () => {
      let productModule: ProductService;
      let availabilityService: AvailabilityService;

      beforeAll(() => {
        const appContainer = getContainer();
        productModule = appContainer.resolve(Modules.PRODUCT);
        availabilityService = appContainer.resolve("availabilityService");
      });

      describe("Testing race condition on cart complete", () => {
        it("refuse the second order because the available quantities are taken", async () => {
          // get the first two products
          const products = (
            await productModule.list({}, { relations: ["variants"] })
          ).slice(0, 2);

          // create carts lines
          const items = products.map((item) => ({
            variant_id: item.variants[0].id,
            quantity: 1,
          }));

          // create products availabilities
          const availabilityProducts = products.map((item) => ({
            productId: item.id,
            quantity: 1,
          }));

          // creating availability
          const availability = await availabilityService.create({
            date: dayjs().add(1, "day").format("YYYY-MM-DD"),
            availabilityProducts,
          });

          // this function create a cart and make it ready for completion
          const createTestCart = async () => {
            const {
              data: { cart },
            } = await api.post(`/store/carts`, {
              items,
            });

            await api.post(`store/carts/${cart.id}/set-availability`, {
              availabilityId: availability.id,
            });

            await api.post(`store/carts/${cart.id}`, {
              email: "test@test.com",
            });

            await api.post(`store/carts/${cart.id}/payment-sessions`);

            return {
              complete: () => api.post(`store/carts/${cart.id}/complete`),
            };
          };

          const bobsCart = await createTestCart();
          const alicesCart = await createTestCart();

          const results = await Promise.allSettled([
            bobsCart.complete(),
            alicesCart.complete(),
          ]);

          expect(results[0].status).toEqual("fulfilled");
          expect(results[1].status).toEqual("rejected");
        });
      });
    });
  },
});
