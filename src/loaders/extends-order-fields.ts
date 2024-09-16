export default async function () {
  // add the availability on default relation on store order routes
  const storeOrdersRouteConfigs = (await import(
    "@medusajs/medusa/dist/api/routes/store/orders/index"
  )) as any;

  storeOrdersRouteConfigs.allowedStoreOrdersRelations = [
    ...storeOrdersRouteConfigs.allowedStoreOrdersRelations,
    "availability",
  ];

  // add the availability on default relation on admin order routes
  const adminOrdersRouteConfigs = (await import(
    "@medusajs/medusa/dist/types/orders"
  )) as any;

  adminOrdersRouteConfigs.defaultAdminOrdersRelations = [
    ...adminOrdersRouteConfigs.defaultAdminOrdersRelations,
    "availability",
  ];
}
