import useChangeAvailabilityStatus from "../../../hooks/availabilities/change-status";
import { AvailabilityStatus } from "../../../types/api";
import { Button } from "@medusajs/ui";

interface Props {
  status: AvailabilityStatus;
  availabilityId: string;
}

const AvailabilityStatusUpdater = ({ status, availabilityId }: Props) => {
  const { isChangingState, onStatusChange } = useChangeAvailabilityStatus(
    availabilityId,
    status,
  );

  return (
    <Button
      isLoading={isChangingState}
      disabled={isChangingState}
      onClick={() => onStatusChange()}
    >
      {status === AvailabilityStatus.Active ? "Désactiver" : "Activer"} la
      disponibilité
    </Button>
  );
};

export default AvailabilityStatusUpdater;
