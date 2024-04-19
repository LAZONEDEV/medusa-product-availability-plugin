import { StatusBadge } from "@medusajs/ui";
import { AvailabilityStatus } from "../../../types/api";

interface Props {
  status: AvailabilityStatus;
}

const AvailabilityStatusBadge = ({ status }: Props) => {
  return (
    <StatusBadge
      color={status === AvailabilityStatus.Active ? "green" : "orange"}
    >
      {status}
    </StatusBadge>
  );
};

export default AvailabilityStatusBadge;
