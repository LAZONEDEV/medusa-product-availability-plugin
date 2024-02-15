export default async function () {
  const storeCartRouteConfigs = (await import(
    "@medusajs/medusa/dist/api/routes/store/carts/index"
  )) as any;

  storeCartRouteConfigs.defaultStoreCartRelations = [
    ...storeCartRouteConfigs.defaultStoreCartRelations,
    "availability",
  ];
}
