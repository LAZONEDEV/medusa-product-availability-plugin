import { Toaster } from "@medusajs/ui";
import AvailabilityLoadingVue from "../../../components/availability/detail-page/AvailabilityLoadingVue";
import AvailabilityLoadFailed from "../../../components/availability/detail-page/AvailabilityLoadFailed";
import { useGetAvailability } from "../../../hooks/availabilities/get-availability";
import AvailabilityDetailTitle from "../../../components/availability/detail-page/AvailabilityDetailTitle";
import AvailabilityDetailsProductsList from "../../../components/availability/detail-page/AvailabilityDetailsProductsList";
import AddNewProductAvailabilitiesForm from "../../../components/availability/detail-page/AddNewProductAvailabilitiesForm";

const Page = () => {
  const { data, error, isLoading, refetch, availabilityId } =
    useGetAvailability();

  if (isLoading) {
    return <AvailabilityLoadingVue />;
  }

  if (error) {
    return <AvailabilityLoadFailed onRetry={refetch} />;
  }

  return (
    <section className="pb-8">
      <Toaster />

      <AvailabilityDetailTitle date={data.date} />

      <AvailabilityDetailsProductsList
        productAvailabilities={data.availabilityProducts}
        availabilityId={availabilityId}
      />

      <AddNewProductAvailabilitiesForm availabilityId={availabilityId} />
    </section>
  );
};

export default Page;
