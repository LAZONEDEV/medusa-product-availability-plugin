import { Toaster } from "@medusajs/ui";
import AvailabilityLoadingVue from "../../../components/availability/detail-page/AvailabilityLoadingVue";
import AvailabilityLoadFailed from "../../../components/availability/detail-page/AvailabilityLoadFailed";
import { useGetAvailability } from "../../../hooks/availabilities/get-availability";
import AvailabilityDetailTitle from "../../../components/availability/detail-page/AvailabilityDetailTitle";
import AvailabilityDetailsProductsList from "../../../components/availability/detail-page/AvailabilityDetailsProductsList";
import AddNewProductAvailabilitiesForm from "../../../components/availability/detail-page/AddNewProductAvailabilitiesForm";
import DeleteAvailabilityPrompt from "../../../components/availability/detail-page/DeleteAvailabilityPrompt";
import AvailabilityStatusUpdater from "../../../components/availability/detail-page/AvailabilityStatusUpdater";

const Page = () => {
  const { data, error, isLoading, refetch, availabilityId } =
    useGetAvailability();

  if (isLoading) {
    return <AvailabilityLoadingVue />;
  }

  if (error || !data) {
    return <AvailabilityLoadFailed onRetry={refetch} />;
  }

  return (
    <section className="pb-8">
      <Toaster />

      <div className="mb-4">
        <AvailabilityDetailTitle date={data.date} status={data.status} />

        <div className="flex items-center justify-between">
          <AvailabilityStatusUpdater
            availabilityId={availabilityId}
            status={data.status}
          />

          <DeleteAvailabilityPrompt availabilityId={availabilityId} />
        </div>
      </div>

      <AvailabilityDetailsProductsList
        productAvailabilities={data.availabilityProducts}
        availabilityId={availabilityId}
      />

      <AddNewProductAvailabilitiesForm availabilityId={availabilityId} />
    </section>
  );
};

export default Page;
